package studio.farsighted.pfe.api.components;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import studio.farsighted.pfe.api.DAOs.CustomUserDetails;
import studio.farsighted.pfe.api.models.UserEntity;
import studio.farsighted.pfe.api.repositories.UserRepository;

@Component
public class UserDetailServiceImplementation implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(UserDetailServiceImplementation.class);
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.debug("Entering in loadUserByUsername Method...");
        UserEntity user = userRepository.findByUsername(username);

        if (user == null) {
            logger.error("Username not found: " + username);
            throw new UsernameNotFoundException("User not found with this username: " + username);
        }
        logger.info("User Authenticated Successfully..!!!");
        return new CustomUserDetails(user);
    }
}
