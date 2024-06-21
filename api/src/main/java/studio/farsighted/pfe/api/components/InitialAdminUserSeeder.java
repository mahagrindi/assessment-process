package studio.farsighted.pfe.api.components;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import studio.farsighted.pfe.api.models.UserEntity;
import studio.farsighted.pfe.api.repositories.UserRepository;

import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;

@Component
public class InitialAdminUserSeeder implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent __unused__) {
        if (this.userRepository.findByUsername("maha.grindi@ey.com").isPresent()) return;
        this.userRepository.save(new UserEntity(null, "maha.grindi@ey.com", passwordEncoder.encode("admin00"), "ADMIN,CONSULTANT,EXPERT,GUEST,MODERATOR", true, true, true, true, new Date(), "maha", "grindi", "", "0000000155", "administrator", "CIUX", "+216", true, "http://localhost:6899/api/files/cc4d9f26a8b395b6e038009655f325cd.png", null, true, "11419183"));
    }
}
