package studio.farsighted.pfe.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studio.farsighted.pfe.api.interfaces.FormEvaluationInterface;
import studio.farsighted.pfe.api.models.Cohort;
import studio.farsighted.pfe.api.models.FormEvaluation;
import studio.farsighted.pfe.api.repositories.FormEvaluationRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FormEvaluationService implements FormEvaluationInterface {

    private final FormEvaluationRepository formEvaluationRepository;

    @Autowired
    public FormEvaluationService(FormEvaluationRepository formEvaluationRepository) {
        this.formEvaluationRepository = formEvaluationRepository;
    }

    @Override
    public FormEvaluation saveFormEvaluation(FormEvaluation formEvaluation) {
        return formEvaluationRepository.save(formEvaluation);
    }

    @Override
    public List<FormEvaluation> fetchformEvaluationList() {
        return formEvaluationRepository.findAll() ;
    }


    public FormEvaluation getByID(String id) {
        return formEvaluationRepository.findById(id).get();
    }

    @Override
    public FormEvaluation updateformEvaluation(FormEvaluation cohort, String cohortId) {
        return null;
    }

    @Override
    public void deleteformEvaluationById(String formEvaluation) {

    }
}
