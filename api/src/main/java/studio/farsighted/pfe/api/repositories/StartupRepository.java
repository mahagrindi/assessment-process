package studio.farsighted.pfe.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import studio.farsighted.pfe.api.models.StartupEntity;

public interface StartupRepository extends JpaRepository<StartupEntity, String> {
    Page<StartupEntity> findByStartupActivitySectorContainingIgnoreCaseOrderByStartupCreatedAtDesc(String query, Pageable pageable);
}
