package studio.farsighted.pfe.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import studio.farsighted.pfe.api.models.AxeSubCriteriaEntity;

import java.util.UUID;

public interface AxeSubCriteriaRepository extends JpaRepository<AxeSubCriteriaEntity, UUID> {
    @Query("SELECT axeSubCriteria FROM AxeSubCriteriaEntity axeSubCriteria WHERE " +
            "(:query IS NULL OR :query = '' OR LOWER(axeSubCriteria.axeSubCriteriaName) LIKE LOWER(CONCAT('%', :query, '%'))) " +
            "AND (:status IS NULL OR axeSubCriteria.status = :status) " +
            "AND (:name IS NULL OR :name = '' OR axeSubCriteria.axeSub.axeSubName = :name)")
    Page<AxeSubCriteriaEntity> filterBasedOnCriteria(@Param("name") String name, @Param("query") String query, @Param("status") Boolean status, Pageable pageable);

}
