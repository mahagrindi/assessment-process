package studio.farsighted.pfe.api.interfaces;

import studio.farsighted.pfe.api.models.ProgramCohortChallengeEntity;

import java.util.UUID;

public interface ProgramCohortChallengeInterface {

    ProgramCohortChallengeEntity save(UUID id, ProgramCohortChallengeEntity programCohortChallengeEntity);

    ProgramCohortChallengeEntity update(ProgramCohortChallengeEntity programCohortChallengeEntity);

    ProgramCohortChallengeEntity find(UUID id);

    void delete(UUID id);

    boolean isExist(UUID id);
}
