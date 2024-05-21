package studio.farsighted.pfe.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import studio.farsighted.pfe.api.models.ProgramCohortChallengeEntity;

import java.util.UUID;

public interface ProgramCohortChallengeRepository extends JpaRepository<ProgramCohortChallengeEntity, UUID> {
}
