package studio.farsighted.pfe.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import studio.farsighted.pfe.api.models.AxeEntity;
import studio.farsighted.pfe.api.models.Criteria;
import studio.farsighted.pfe.api.models.SubAxeEntity;
import studio.farsighted.pfe.api.services.SubAxeService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import studio.farsighted.pfe.api.exceptions.PersistDataException;

@RestController
@RequestMapping("/api/sub-axes")
@CrossOrigin(origins = "http://localhost:1999", allowCredentials = "true", allowedHeaders = "*")
public class SubAxeController {

    @Autowired
    private SubAxeService subaxeService;

    @PutMapping(value = "")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> update(@RequestBody SubAxeEntity subaxe) {
        try {
            SubAxeEntity updatedSubAxe = subaxeService.updateSubAxe(subaxe);
            return ResponseEntity.ok(updatedSubAxe);
        } catch (PersistDataException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating SubAxeEntity: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unknown internal server error.");
        }
    }

/*  API GEt By id sub-axe */
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> getSubAxeById(@PathVariable String id) {
        try {
            SubAxeEntity subaxe = subaxeService.subAxeById(id);
            if (subaxe != null) {
                return ResponseEntity.ok(subaxe);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("SubAxeEntity not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching SubAxeEntity: " + e.getMessage());
        }
    }



    /* API UpDate visibility of sub-axe */
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public SubAxeEntity updateVisibility(@PathVariable String id) {
        if (!subaxeService.isExist(id)) {
            throw new PersistDataException("axe with id: " + id + " not found");
        }
        return subaxeService.updatesubAxeVisibility(id);
    }


    /* API Post to add Criterias to an sub-axe */
    @PostMapping(value = "/criteria", params = {"subaxeId"})
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<SubAxeEntity> save(@RequestParam(value = "subaxeId") String id, @RequestBody Criteria criteriaEntity) {
        try {
            return ResponseEntity.ok(subaxeService.addCriteria(id, criteriaEntity));
        } catch (Exception e) {
            throw new PersistDataException("Program Cohort not saved: " + e.getMessage());
        }
    }
}


