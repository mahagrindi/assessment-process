# EYVAL - EY Startup Assessment Automation

Welcome to the EY Startup Assessment Automation project! This project aims to automate the process of startup assessment conducted by experts at EY by leveraging the power of AI. Below is an overview of the project structure and its components:

## Project Structure

- **.github**: Here you'll find GitHub workflows for automating various aspects of the project's development workflow.

- **DB**: This directory stores shared files across the entire project, such as database schemas or configuration files.

- **api**: The `api` directory houses the Spring Boot backend service application responsible for handling API requests and business logic.

- **client**: In the `client` directory, you'll find the Next.js frontend application used for interacting with the backend services and presenting data to users.

- **crawler**: This directory contains the Flask service application responsible for scraping data from websites. It plays a crucial role in gathering relevant information for startup assessment.

- **learner**: Here resides the Flask service application for augmenting data and training machine learning models. This component is essential for automating the assessment process and providing insights based on AI analysis.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project root directory.
3. Start the backend services (`api`, `crawler`, `learner`) using the provided Docker containers.
4. Launch the frontend application (`client`) to interact with the backend services.

## Contributing

We appreciate your interest in the project, but currently, we are not accepting contributions from the community as this project falls under the jurisdiction of AMC Ernst & Young. Therefore, any pull requests made to this repository will be denied.

## License

This project is licensed under the [Apache License 2.0. ](LICENSE).

## Contact

If you have any questions or feedback regarding the project, feel free to reach out to us at [walesebii@outlook.com](mailto:walesebii@outlook.com).


