package studio.farsighted.pfe.api.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import studio.farsighted.pfe.api.models.EvaluationEntity;

import java.util.UUID;

public interface EvaluationInterface {
    Page<EvaluationEntity> findAll(Pageable pageable);

    Page<EvaluationEntity> findByCohortId(UUID cohortIdm, Pageable pageable);

    Page<EvaluationEntity> findByStartupId(UUID startupId, Pageable pageable);

    EvaluationEntity findById(UUID id);

    EvaluationEntity save(UUID startup, UUID cohort, EvaluationEntity evaluation);

    EvaluationEntity update(EvaluationEntity evaluation);

    void delete(UUID id);

    Boolean existsById(UUID id);

}
