package studio.farsighted.pfe.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import studio.farsighted.pfe.api.models.ProgramProviderEntity;

import java.util.UUID;

public interface ProgramProviderRepository extends JpaRepository<ProgramProviderEntity, UUID> {
}
