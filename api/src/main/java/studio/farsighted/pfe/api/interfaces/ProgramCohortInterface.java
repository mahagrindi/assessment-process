package studio.farsighted.pfe.api.interfaces;

import studio.farsighted.pfe.api.models.ProgramCohortEntity;

import java.util.List;
import java.util.UUID;

public interface ProgramCohortInterface {
    List<ProgramCohortEntity> get();

    List<ProgramCohortEntity> findByProgram(UUID id);

    ProgramCohortEntity find(UUID id);

    ProgramCohortEntity save(UUID id, ProgramCohortEntity programCohortEntity);

    ProgramCohortEntity update(ProgramCohortEntity programCohortEntity);

    void delete(UUID id);

    Boolean isExist(UUID id);

}
