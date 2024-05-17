package studio.farsighted.pfe.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import studio.farsighted.pfe.api.exceptions.PersistDataException;
import studio.farsighted.pfe.api.models.Criteria;
import studio.farsighted.pfe.api.services.CriteriaService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/criteria")
public class CriteriaController {
    @Autowired
    private CriteriaService criteriaService;


    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")

    public ResponseEntity<Criteria> getCriteriaById(@PathVariable String id) {
        Optional<Criteria> criteria = criteriaService.getCriteriaById(id);
        return criteria.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    /* API UpDate visibility of Criteria */
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public Criteria updateVisibility(@PathVariable String id) {
        if (!criteriaService.isExist(id)) {
            throw new PersistDataException("axe with id: " + id + " not found");
        }
        return criteriaService.updateVisibility(id);
    }

    /* API UpDate Criteria */
    @PutMapping(value = "")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> update(@RequestBody Criteria criteria) {
        try {
            Criteria updatedcriteria = criteriaService.update(criteria);
            return ResponseEntity.ok(updatedcriteria);
        } catch (PersistDataException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating criteriaEntity: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unknown internal server error.");
        }
    }

}
