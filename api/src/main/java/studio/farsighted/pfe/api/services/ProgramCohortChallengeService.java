package studio.farsighted.pfe.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studio.farsighted.pfe.api.exceptions.PersistDataException;
import studio.farsighted.pfe.api.interfaces.ProgramCohortChallengeInterface;
import studio.farsighted.pfe.api.models.ProgramCohortChallengeEntity;
import studio.farsighted.pfe.api.models.ProgramCohortEntity;
import studio.farsighted.pfe.api.repositories.ProgramCohortChallengeRepository;
import studio.farsighted.pfe.api.repositories.ProgramCohortRepository;

import java.util.UUID;

@Service
public class ProgramCohortChallengeService implements ProgramCohortChallengeInterface {

    @Autowired
    private ProgramCohortChallengeRepository programCohortChallengeRepository;

    @Autowired
    private ProgramCohortRepository programCohortRepository;

    @Override
    public ProgramCohortChallengeEntity save(UUID id, ProgramCohortChallengeEntity programCohortChallengeEntity) {
        ProgramCohortEntity cohort = programCohortRepository.findById(id).orElseThrow(() -> new PersistDataException("Cohort not found"));
        programCohortChallengeEntity.setCohort(cohort);
        return programCohortChallengeRepository.save(programCohortChallengeEntity);
    }

    @Override
    public ProgramCohortChallengeEntity update(ProgramCohortChallengeEntity programCohortChallengeEntity) {
        ProgramCohortChallengeEntity entity = programCohortChallengeRepository.findById(programCohortChallengeEntity.getId()).orElseThrow(() -> new PersistDataException("Cohort Challenge not found"));
        programCohortChallengeEntity.setCohort(entity.getCohort());
        return programCohortChallengeRepository.save(programCohortChallengeEntity);
    }

    @Override
    public ProgramCohortChallengeEntity find(UUID id) {
        return programCohortChallengeRepository.findById(id).get();
    }

    @Override
    public void delete(UUID id) {
        programCohortChallengeRepository.deleteById(id);
    }

    @Override
    public boolean isExist(UUID id) {
        return programCohortChallengeRepository.existsById(id);
    }
}
