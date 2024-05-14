package studio.farsighted.pfe.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import studio.farsighted.pfe.api.models.AxeEntity;

public interface AxeRepository extends JpaRepository<AxeEntity, String> {

    @Query("SELECT axe FROM AxeEntity axe WHERE " +
            "LOWER(axe.axe_name) LIKE LOWER(CONCAT('%', :axe_name, '%')) " +
            "AND (:visibility IS NULL OR axe.visibility = :visibility)")
    Page<AxeEntity> findAxeByFilter(@Param("axe_name") String axe_name,
                                    @Param("visibility") Boolean visibility,
                                    Pageable pageable);
}
