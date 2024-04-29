package studio.farsighted.pfe.api.repositories;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import studio.farsighted.pfe.api.models.UserEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {
    Optional<UserEntity> findByUsername(String username);

    @Query("SELECT DISTINCT department FROM UserEntity")
    List<String> findDistinctUserDepartment();

    @Query("SELECT DISTINCT jobTitle FROM UserEntity")
    List<String> findDistinctJobTitles();

    @Query("SELECT user FROM UserEntity user WHERE " +
            "(:query IS NULL OR :query = '' OR LOWER(user.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(user.lastName) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(user.username) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(user.cin) LIKE LOWER(CONCAT('%', :query, '%'))) " +
            "AND (:title IS NULL OR :title = '' OR user.jobTitle = :title) " +
            "AND (:status IS NULL OR user.enabled = :status) " +
            "AND (:department IS NULL OR :department = '' OR user.department = :department)")
    Page<UserEntity> findUsersByFilterCriteria(@Param("query") String query, @Param("title") String title, @Param("status") Boolean status, @Param("department") String department, Pageable pageable);

}