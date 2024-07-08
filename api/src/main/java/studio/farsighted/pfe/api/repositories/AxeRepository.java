package studio.farsighted.pfe.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import studio.farsighted.pfe.api.models.AxeEntity;

import java.util.List;
import java.util.UUID;

public interface AxeRepository extends JpaRepository<AxeEntity, UUID> {
    @Query("SELECT axe FROM AxeEntity axe WHERE " +
            "(:query IS NULL OR :query = '' OR LOWER(axe.axeName) LIKE LOWER(CONCAT('%', :query, '%'))) " +
            "AND (:status IS NULL OR axe.status = :status)")
    Page<AxeEntity> filterByCriteria(@Param("query") String query, @Param("status") Boolean status, Pageable pageable);


    @Query("SELECT status, COUNT(*) AS count FROM AxeEntity GROUP BY status")
    List<Object[]> countAxesByStatus();

}
