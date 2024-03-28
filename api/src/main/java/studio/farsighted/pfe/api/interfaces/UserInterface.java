package studio.farsighted.pfe.api.interfaces;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import studio.farsighted.pfe.api.models.UserEntity;

import java.util.UUID;

public interface UserInterface {
    Page<UserEntity> getAll(Pageable pageable);

    UserEntity find(UUID id);

    UserEntity save(UserEntity user);

    UserEntity update(UserEntity user);

    void delete(UUID id);

    UserEntity findByEmail(String email);

    Boolean isExist(UUID id);
}
