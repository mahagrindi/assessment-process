package studio.farsighted.pfe.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import studio.farsighted.pfe.api.models.Cohort;


@Repository
public interface CohortRepository extends JpaRepository<Cohort, String> {

     void deleteCohortById(String cohortId);

}