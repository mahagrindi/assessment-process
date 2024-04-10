package studio.farsighted.pfe.api.components;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import studio.farsighted.pfe.api.models.UserEntity;
import studio.farsighted.pfe.api.repositories.UserRepository;

import java.util.Date;

@Component
public class InitialAdminUserSeeder implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent __unused__) {
        if (this.userRepository.findByEmail("admin@tn.ey.com").isPresent()) return;
        this.userRepository.save(new UserEntity(null, "Super User", "admin", "admin@tn.ey.com", passwordEncoder.encode("admin123"), "ADMIN,CONSULTANT,EXPERT,GUEST", true, true, true, true, new Date()));
    }
}
