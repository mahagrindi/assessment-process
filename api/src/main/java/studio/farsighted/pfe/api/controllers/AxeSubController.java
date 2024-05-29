package studio.farsighted.pfe.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import studio.farsighted.pfe.api.exceptions.PersistDataException;
import studio.farsighted.pfe.api.models.AxeSubEntity;
import studio.farsighted.pfe.api.services.AxeSubService;

import java.util.UUID;

@RestController
@RequestMapping("/api/axe/sub")
@CrossOrigin(origins = "http://localhost:1999 ", allowCredentials = "true", allowedHeaders = "*")
public class AxeSubController {

    @Autowired
    private AxeSubService axeSubService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Iterable<AxeSubEntity>> index() {
        try {
            return ResponseEntity.ok(axeSubService.findAll());
        } catch (Exception e) {
            throw new PersistDataException("Axe Sub not found: " + e.getMessage());
        }
    }

    @GetMapping(value = "/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<AxeSubEntity> show(@PathVariable UUID id) {
        try {
            return ResponseEntity.ok(axeSubService.findById(id));
        } catch (Exception e) {
            throw new PersistDataException("Axe Sub not found: " + e.getMessage());
        }
    }

    @PostMapping(value = "", params = {"axeId"})
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<AxeSubEntity> save(@RequestParam(value = "axeId") UUID id, @RequestBody AxeSubEntity axeSub) {
        try {
            return ResponseEntity.ok(axeSubService.save(id, axeSub));
        } catch (Exception e) {
            throw new PersistDataException("Axe Sub not saved: " + e.getMessage());
        }
    }

    @PutMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<AxeSubEntity> update(@RequestBody AxeSubEntity axeSub) {
        try {
            return ResponseEntity.ok(axeSubService.update(axeSub));
        } catch (Exception e) {
            throw new PersistDataException("Axe Sub not updated: " + e.getMessage());
        }
    }

    @DeleteMapping(value = "/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
        try {
            axeSubService.deleteById(id);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            throw new PersistDataException("Axe Sub not deleted: " + e.getMessage());
        }
    }

}
