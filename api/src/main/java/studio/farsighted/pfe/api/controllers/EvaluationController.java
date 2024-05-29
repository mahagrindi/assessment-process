package studio.farsighted.pfe.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import studio.farsighted.pfe.api.exceptions.PersistDataException;
import studio.farsighted.pfe.api.models.EvaluationEntity;
import studio.farsighted.pfe.api.services.EvaluationService;

import java.util.UUID;

@RestController
@RequestMapping("/api/evaluation")
@CrossOrigin(origins = "http://localhost:1999 ", allowCredentials = "true", allowedHeaders = "*")
public class EvaluationController {

    @Autowired
    private EvaluationService evaluationService;

    @GetMapping(value = "", params = {"cohortId", "startupId"})
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Page<EvaluationEntity>> index(@RequestParam(value = "cohortId", required = false) UUID cohortId, @RequestParam(value = "startupId") UUID startupId, @PageableDefault(size = 10, page = 0, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            if (cohortId != null) {
                return ResponseEntity.ok(evaluationService.findByCohortId(cohortId, pageable));
            }

            if (startupId != null) {
                return ResponseEntity.ok(evaluationService.findByStartupId(startupId, pageable));
            }

            return ResponseEntity.ok(evaluationService.findAll(pageable));
        } catch (Exception e) {
            throw new PersistDataException("Evaluations not found: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<EvaluationEntity> show(@PathVariable("id") UUID id) {
        try {
            return ResponseEntity.ok(evaluationService.findById(id));
        } catch (Exception e) {
            throw new PersistDataException("Evaluation not found: " + e.getMessage());
        }
    }

    @PostMapping(value = "", params = {"startupId", "cohortId"})
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<EvaluationEntity> save(@RequestParam(value = "startupId") UUID startupId, @RequestParam(value = "cohortId") UUID cohortId, @RequestBody EvaluationEntity evaluation) {
        try {
            return ResponseEntity.ok(evaluationService.save(startupId, cohortId, evaluation));
        } catch (Exception e) {
            throw new PersistDataException("Evaluation not saved: " + e.getMessage());
        }
    }

    @PutMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<EvaluationEntity> update(@RequestBody EvaluationEntity evaluation) {
        try {
            return ResponseEntity.ok(evaluationService.update(evaluation));
        } catch (Exception e) {
            throw new PersistDataException("Evaluation not updated: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Boolean> delete(@PathVariable("id") UUID id) {
        try {
            evaluationService.delete(id);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            throw new PersistDataException("Evaluation not deleted: " + e.getMessage());
        }
    }

}
