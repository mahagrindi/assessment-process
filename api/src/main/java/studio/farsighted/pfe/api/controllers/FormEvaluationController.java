package studio.farsighted.pfe.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import studio.farsighted.pfe.api.exceptions.EntityNotFoundException;
import studio.farsighted.pfe.api.exceptions.PersistDataException;
import studio.farsighted.pfe.api.models.FormEvaluation;
import studio.farsighted.pfe.api.models.StartupEntity;
import studio.farsighted.pfe.api.services.FormEvaluationService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/form-evaluations")
public class FormEvaluationController {

    private final FormEvaluationService formEvaluationService;

    @Autowired
    public FormEvaluationController(FormEvaluationService formEvaluationService) {
        this.formEvaluationService = formEvaluationService;
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<FormEvaluation> save(@RequestBody FormEvaluation formEvaluation) {
        try {

            return ResponseEntity.ok(formEvaluationService.saveFormEvaluation(formEvaluation) );
        } catch (Exception e) {
            throw new PersistDataException("formEvaluation not saved: " + e.getMessage());
        }
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<FormEvaluation> find(@PathVariable String id)   {

        return ResponseEntity.ok(formEvaluationService.getByID(id));
    }



}
