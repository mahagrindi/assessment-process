package studio.farsighted.pfe.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import studio.farsighted.pfe.api.interfaces.UserInterface;
import studio.farsighted.pfe.api.models.UserEntity;
import studio.farsighted.pfe.api.repositories.UserRepository;

import java.util.UUID;

@Service
public class UserService implements UserInterface {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Page<UserEntity> getAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public UserEntity find(UUID id) {
        return userRepository.findById(id).get();
    }

    @Override
    public UserEntity save(UserEntity user) {
        return userRepository.save(user);
    }

    @Override
    public UserEntity update(UserEntity user) {
        return userRepository.save(user);
    }

    @Override
    public void delete(UUID id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserEntity findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow();
    }

    @Override
    public Boolean isExist(UUID id) {
        return userRepository.existsById(id);
    }
}
