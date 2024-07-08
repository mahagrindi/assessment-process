package studio.farsighted.pfe.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import studio.farsighted.pfe.api.models.ForumEntity;

import java.util.UUID;

public interface ForumRepository extends JpaRepository<ForumEntity, UUID> {

    @Query("SELECT forum FROM ForumEntity forum WHERE " +
            "(:query IS NULL OR :query = '' OR LOWER(forum.formName) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(forum.programCohortEntity.cohortName) LIKE LOWER(CONCAT('%', :query, '%'))) " +
            "AND (:status IS NULL OR forum.status = :status)")
    Page<ForumEntity> findForumsByFilterCriteria(@Param("query") String query, @Param("status") Boolean status, Pageable pageable);

}
