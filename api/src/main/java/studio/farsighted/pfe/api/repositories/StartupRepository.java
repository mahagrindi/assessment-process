package studio.farsighted.pfe.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import studio.farsighted.pfe.api.entities.Startup;

public interface StartupRepository extends JpaRepository<Startup, String> {
    Page<Startup> findByStartupActivitySectorContainingIgnoreCaseOrderByStartupCreatedAtDesc(String query, Pageable pageable);
}
