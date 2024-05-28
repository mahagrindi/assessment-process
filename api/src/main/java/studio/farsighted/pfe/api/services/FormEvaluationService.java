package studio.farsighted.pfe.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import studio.farsighted.pfe.api.exceptions.PersistDataException;
import studio.farsighted.pfe.api.interfaces.FormEvaluationInterface;
import studio.farsighted.pfe.api.models.*;
import studio.farsighted.pfe.api.repositories.ChallengesRepository;
import studio.farsighted.pfe.api.repositories.FormEvaluationRepository;

import java.util.*;

@Service
public class FormEvaluationService implements FormEvaluationInterface {

    private final FormEvaluationRepository formEvaluationRepository;
    private ChallengesRepository challengesRepository;


    @Autowired
    public FormEvaluationService(FormEvaluationRepository formEvaluationRepository) {
        this.formEvaluationRepository = formEvaluationRepository;
    }


    public ResponseEntity<FormEvaluation> Copie(String id) {
        try {
            // Get the original form evaluation by its ID
           FormEvaluation  originalForm = formEvaluationRepository.findById(id).get();



            // Create a new FormEvaluation object as a copy of the original
            FormEvaluation copiedForm = new FormEvaluation();

            // Copy attributes from the original to the copied form
            copiedForm.setTitle(originalForm.getTitle() + " Copie" );
            // You may need to adjust other attributes here depending on your entity

            // Save the copied form evaluation
            FormEvaluation savedCopiedForm = formEvaluationRepository.save(copiedForm);

            return ResponseEntity.ok(savedCopiedForm);
        } catch (Exception e) {
            throw new PersistDataException("Failed to copy form evaluation: " + e.getMessage());
        }

    }
    public FormEvaluation saveForm(FormEvaluation formEvaluation) {
        // Iterate over sections to persist associated questions
        for (Section section : formEvaluation.getSections()) {
            // Persist questions if not already persisted
            List<Question> questions = section.getQuestions();

        }
        // Save the formEvaluation

        return formEvaluationRepository.save(formEvaluation);

    }


    @Override
    public FormEvaluation saveFormEvaluation(FormEvaluation formEvaluation) {
        return null;
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
