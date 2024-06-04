package studio.farsighted.pfe.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import studio.farsighted.pfe.api.models.FormEvaluation;

import java.util.List;
import java.util.Optional;

@Repository
public interface FormEvaluationRepository extends JpaRepository<FormEvaluation, String> {

}
