package studio.farsighted.pfe.api.startup.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import studio.farsighted.pfe.api.startup.models.Startup;

public interface StartupRepository extends JpaRepository<Startup, String> {
    Page<Startup> findByStartupActivitySectorContainingIgnoreCaseOrderByStartupCreatedAtDesc(String query, Pageable pageable);
}
