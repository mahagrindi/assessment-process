package studio.farsighted.pfe.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import studio.farsighted.pfe.api.models.StorageEntity;

import java.util.UUID;

public interface StorageRepository extends JpaRepository<StorageEntity, UUID>{
}
