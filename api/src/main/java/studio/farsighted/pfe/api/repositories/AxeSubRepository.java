package studio.farsighted.pfe.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import studio.farsighted.pfe.api.models.AxeSubEntity;

import java.util.UUID;

public interface AxeSubRepository extends JpaRepository<AxeSubEntity, UUID> {
}
