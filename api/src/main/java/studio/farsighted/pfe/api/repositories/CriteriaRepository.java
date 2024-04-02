package studio.farsighted.pfe.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import studio.farsighted.pfe.api.models.Criteria;

public interface CriteriaRepository  extends JpaRepository<Criteria, String> {
}

