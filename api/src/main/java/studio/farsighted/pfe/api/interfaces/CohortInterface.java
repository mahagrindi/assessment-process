package studio.farsighted.pfe.api.interfaces;

import studio.farsighted.pfe.api.models.Cohort;

import java.io.IOException;
import java.util.List;

// Class
public interface CohortInterface {

    // Save operation
    Cohort saveCohort(Cohort cohort);

    // Read operation
    List<Cohort> fetchCohortList();

    // Update operation
    Cohort updateCohort(Cohort cohort,
            String cohortId);

    // Delete operation
    void deleteCohortById(String cohortId);
}
