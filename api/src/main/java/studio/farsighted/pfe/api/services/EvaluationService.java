package studio.farsighted.pfe.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import studio.farsighted.pfe.api.interfaces.EvaluationInterface;
import studio.farsighted.pfe.api.models.EvaluationEntity;
import studio.farsighted.pfe.api.models.ProgramCohortEntity;
import studio.farsighted.pfe.api.models.StartupEntity;
import studio.farsighted.pfe.api.repositories.EvaluationRepository;
import studio.farsighted.pfe.api.repositories.ProgramCohortRepository;
import studio.farsighted.pfe.api.repositories.StartupRepository;

import java.util.UUID;

@Service
public class EvaluationService implements EvaluationInterface {

    @Autowired
    private EvaluationRepository evaluationRepository;

    @Autowired
    private StartupRepository startupRepository;

    @Autowired
    private ProgramCohortRepository programCohortRepository;

    @Override
    public Page<EvaluationEntity> findAll(Pageable pageable) {
        return evaluationRepository.findAll(pageable);
    }

    @Override
    public Page<EvaluationEntity> findByCohortId(UUID cohortId, Pageable pageable) {
        return evaluationRepository.findByCohortId(cohortId, pageable);
    }

    @Override
    public Page<EvaluationEntity> findByStartupId(UUID startupId, Pageable pageable) {
        return evaluationRepository.findByStartupId(startupId, pageable);
    }

    @Override
    public EvaluationEntity findById(UUID id) {
        return evaluationRepository.findById(id).get();
    }

    @Override
    public EvaluationEntity save(UUID startup, UUID cohort, EvaluationEntity evaluation) {
        StartupEntity startupEntity = startupRepository.findById(startup).orElse(null);
        ProgramCohortEntity programCohortEntity = programCohortRepository.findById(cohort).orElse(null);

        evaluation.setStartup(startupEntity);
        evaluation.setCohort(programCohortEntity);

        return evaluationRepository.save(evaluation);
    }

    @Override
    public EvaluationEntity update(EvaluationEntity evaluation) {
        return evaluationRepository.save(evaluation);
    }

    @Override
    public void delete(UUID id) {
        evaluationRepository.deleteById(id);
    }

    @Override
    public Boolean existsById(UUID id) {
        return evaluationRepository.existsById(id);
    }
}
