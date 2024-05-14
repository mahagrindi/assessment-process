package studio.farsighted.pfe.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import studio.farsighted.pfe.api.models.ProgramCohortEntity;

import java.util.List;
import java.util.UUID;

public interface ProgramCohortRepository extends JpaRepository<ProgramCohortEntity, UUID> {
    List<ProgramCohortEntity> findAllByProgramId(UUID programId);
}
