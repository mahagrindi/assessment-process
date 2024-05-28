package studio.farsighted.pfe.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import studio.farsighted.pfe.api.models.EvaluationEntity;

import java.util.UUID;

public interface EvaluationRepository extends JpaRepository<EvaluationEntity, UUID> {

    Page<EvaluationEntity> findByCohortId(UUID cohortId, Pageable pageable);

    Page<EvaluationEntity> findByStartupId(UUID startupId, Pageable pageable);

}
