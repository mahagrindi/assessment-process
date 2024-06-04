package studio.farsighted.pfe.api.interfaces;

import studio.farsighted.pfe.api.models.Cohort;
import studio.farsighted.pfe.api.models.FormEvaluation;

import java.util.List;
import java.util.Optional;

public interface FormEvaluationInterface  {

    FormEvaluation saveFormEvaluation(FormEvaluation formEvaluation);

    // Read operation
    List<FormEvaluation> fetchformEvaluationList();

    // Update operation
    FormEvaluation updateformEvaluation(FormEvaluation cohort,
                        String cohortId);

    // Delete operation
    void deleteformEvaluationById(String formEvaluation);
}
