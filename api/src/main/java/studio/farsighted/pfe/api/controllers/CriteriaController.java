package studio.farsighted.pfe.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studio.farsighted.pfe.api.models.Criteria;
import studio.farsighted.pfe.api.services.CriteriaService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/criteria")
public class CriteriaController {
    @Autowired
    private CriteriaService criteriaService;

    @GetMapping("/")
    public List<Criteria> getAllCriteria() {
        return criteriaService.getAllCriteria();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Criteria> getCriteriaById(@PathVariable String id) {
        Optional<Criteria> criteria = criteriaService.getCriteriaById(id);
        return criteria.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/")
    public ResponseEntity<Criteria> saveCriteria(@RequestBody Criteria criteria) {
        Criteria savedCriteria = criteriaService.saveCriteria(criteria);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCriteria);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCriteria(@PathVariable String id) {
        criteriaService.deleteCriteria(id);
        return ResponseEntity.noContent().build();
    }
}
