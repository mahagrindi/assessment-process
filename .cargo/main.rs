use crossterm::{
    cursor::MoveTo, execute,
    event::{read, Event, KeyCode},
    style::{Color, Print, ResetColor},
    terminal::{self, Clear, ClearType, EnterAlternateScreen, LeaveAlternateScreen},
};
use std::io::{self, Write};
use std::process::{Child, Command, Stdio};
use std::thread;
use std::time::Duration;

enum ServiceState {
    Stopped,
    Running,
}

struct Service {
    name: &'static str,
    command: &'static str,
    state: ServiceState,
}

fn main() -> io::Result<()> {
    let mut services = vec![
        Service {
            name: "Flask ML Service",
            command: "python /learner/run.py",
            state: ServiceState::Stopped,
        },
        Service {
            name: "Flask Scrapper Service",
            command: "python /crawler/run.py",
            state: ServiceState::Stopped,
        },
        Service {
            name: "Next.js Client App",
            command: "npm --prefix /client run dev",
            state: ServiceState::Stopped,
        },
    ];

    let mut current_child: Option<Child> = None;
    let mut stdout = io::stdout();

    execute!(stdout, EnterAlternateScreen)?;

    let mut selected = 0usize;
    loop {
        print_menu(&mut stdout, &services, selected)?;

        match read()? {
            Event::Key(event) => match event.code {
                KeyCode::Up => {
                    if selected > 0 {
                        selected -= 1;
                    }
                }
                KeyCode::Down => {
                    if selected < services.len() - 1 {
                        selected += 1;
                    }
                }
                KeyCode::Char(' ') => {
                    if let Some(child) = current_child.as_mut() {
                        let _ = child.kill();
                        services[selected].state = ServiceState::Stopped;
                    }

                    let service = &services[selected];
                    let child = Command::new("sh")
                        .arg("-c")
                        .arg(service.command)
                        .stdout(Stdio::null())
                        .stderr(Stdio::null())
                        .spawn();

                    match child {
                        Ok(c) => {
                            current_child = Some(c);
                            services[selected].state = ServiceState::Running;
                        }
                        Err(_) => {
                            println!("Failed to start service.");
                        }
                    }
                }
                KeyCode::Char('q') => break,
                _ => {}
            },
            _ => {}
        }
    }

    execute!(stdout, LeaveAlternateScreen)?;

    // Ensure any running child is terminated
    if let Some(mut child) = current_child {
        let _ = child.kill();
    }

    Ok(())
}

fn print_menu(stdout: &mut io::Stdout, services: &[Service], selected: usize) -> io::Result<()> {
    execute!(stdout, Clear(ClearType::All))?;

    for (i, service) in services.iter().enumerate() {
        if i == selected {
            execute!(stdout, Print("> "),)?;
        } else {
            execute!(stdout, Print("  "),)?;
        }

        match service.state {
            ServiceState::Running => {
                execute!(stdout, Print(service.name), ResetColor, Print(" [Running]\n"),)?;
            }
            ServiceState::Stopped => {
                execute!(stdout, Print(service.name), ResetColor, Print(" [Stopped]\n"),)?;
            }
        }
    }

    stdout.flush()?;
    Ok(())
}
