package studio.farsighted.pfe.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import studio.farsighted.pfe.api.models.ProgramCohortEntity;

import java.util.UUID;

public interface ProgramCohortRepository extends JpaRepository<ProgramCohortEntity, UUID> {
    Page<ProgramCohortEntity> findAllByProgramId(UUID programId, Pageable pageable);
}
