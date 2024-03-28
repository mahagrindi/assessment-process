package studio.farsighted.pfe.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import studio.farsighted.pfe.api.models.UserEntity;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {
    Optional<UserEntity> findByUsername(String username);

    Optional<UserEntity> findByEmail(String email);
}