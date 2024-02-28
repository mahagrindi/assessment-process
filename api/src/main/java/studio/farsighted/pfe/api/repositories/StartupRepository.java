package studio.farsighted.pfe.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import studio.farsighted.pfe.api.entities.Startup;

public interface StartupRepository extends JpaRepository<Startup, String> {
}
