package studio.farsighted.pfe.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import studio.farsighted.pfe.api.exceptions.PaginationBoundException;
import studio.farsighted.pfe.api.exceptions.PersistDataException;
import studio.farsighted.pfe.api.models.AxeEntity;
import studio.farsighted.pfe.api.services.AxeService;

import java.util.UUID;

@RestController
@RequestMapping("/api/axe")
@CrossOrigin(origins = "http://localhost:1999 ", allowCredentials = "true", allowedHeaders = "*")
public class AxeController {

    @Autowired
    private AxeService axeService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Page<AxeEntity>> index(@RequestParam(value = "query", required = false) String query, @RequestParam(value = "status", required = false) Boolean status, @PageableDefault(size = 10, page = 0, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            return ResponseEntity.ok(axeService.get(query, status, pageable));
        } catch (Exception e) {
            throw new PaginationBoundException("Axes not found: " + e.getMessage());
        }
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<AxeEntity> save(@RequestBody AxeEntity axe) {
        try {
            return ResponseEntity.ok(axeService.save(axe));
        } catch (Exception e) {
            throw new PersistDataException("Axe not saved: " + e.getMessage());
        }
    }

    @PutMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<AxeEntity> update(@RequestBody AxeEntity axe) {
        if (!axeService.isExist(axe.getId())) {
            throw new PersistDataException("Axe with id: " + axe.getId() + " not found");
        }
        return ResponseEntity.ok(axeService.update(axe));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<AxeEntity> find(@PathVariable("id") UUID id) {
        if (!axeService.isExist(id)) {
            throw new PersistDataException("Axe with id: " + id + " not found");
        }
        return ResponseEntity.ok(axeService.findById(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Boolean> delete(@PathVariable("id") UUID id) {
        if (!axeService.isExist(id)) {
            throw new PersistDataException("Axe with id: " + id + " not found");
        }
        try {
            axeService.delete(id);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            throw new PersistDataException("Axe with id: " + id + " not deleted: " + e.getMessage());
        }
    }

}
