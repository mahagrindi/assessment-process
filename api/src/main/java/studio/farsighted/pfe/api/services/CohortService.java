package studio.farsighted.pfe.api.services;

import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import studio.farsighted.pfe.api.models.Cohort;
import studio.farsighted.pfe.api.interfaces.CohortInterface;
import studio.farsighted.pfe.api.repositories.CohortRepository;

// Annotation
@Service
public class CohortService
	implements CohortInterface {

	@Autowired
	private CohortRepository cohortRepository;

	// Save operation
	@Override
	public Cohort saveCohort (Cohort cohort)
	{
		return cohortRepository.save(cohort);
	}

	// Read operation
	@Override public List<Cohort> fetchCohortList()
	{
		return (List<Cohort>)
        cohortRepository.findAll();
	}

	// Update operation
	@Override
	public Cohort updateCohort(Cohort cohort, String cohortId) {
		Cohort cohortDB = cohortRepository.findById(cohortId).orElse(null);
		if (cohortDB != null) {
			if (cohort.getCohortName() != null && !cohort.getCohortName().isEmpty()) {
				cohortDB.setCohortName(cohort.getCohortName());
			}
			if (cohort.getCohortDescription() != null && !cohort.getCohortDescription().isEmpty()) {
				cohortDB.setCohortDescription(cohort.getCohortDescription());
			}
			// Update other properties as needed

			return cohortRepository.save(cohortDB);
		}
		return null; // or throw an exception if desired
	}


	// Delete operation
	@Override
	public void deleteCohortById(String cohortId) {
		cohortRepository.deleteById(cohortId);
	}

}
