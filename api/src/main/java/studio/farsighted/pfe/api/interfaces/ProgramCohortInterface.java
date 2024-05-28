package studio.farsighted.pfe.api.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import studio.farsighted.pfe.api.models.ProgramCohortEntity;

import java.util.List;
import java.util.UUID;

public interface ProgramCohortInterface {
    List<ProgramCohortEntity> getAll();

    Page<ProgramCohortEntity> get(Pageable pageable);

    Page<ProgramCohortEntity> findByProgram(UUID id, Pageable pageable);

    ProgramCohortEntity find(UUID id);

    ProgramCohortEntity save(UUID id, ProgramCohortEntity programCohortEntity);

    ProgramCohortEntity update(ProgramCohortEntity programCohortEntity);

    void delete(UUID id);

    Boolean isExist(UUID id);

}
