package studio.farsighted.pfe.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import studio.farsighted.pfe.api.exceptions.EntityNotFoundException;
import studio.farsighted.pfe.api.exceptions.PaginationBoundException;
import studio.farsighted.pfe.api.exceptions.PersistDataException;
import studio.farsighted.pfe.api.models.StartupEntity;
import studio.farsighted.pfe.api.services.StartupService;

@RestController
@RequestMapping("api/startup")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class StartupController {

    @Autowired
    private StartupService startupService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Page<StartupEntity>> index(@PageableDefault(size = 10, page = 0, sort = "startupCreatedAt", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            return ResponseEntity.ok(startupService.getAll(pageable));
        } catch (Exception e) {
            throw new PaginationBoundException("Startups not found");
        }
    }

    @PostMapping
    public ResponseEntity<StartupEntity> save(@RequestBody StartupEntity startupEntity) {
        try {
            return ResponseEntity.ok(startupService.save(startupEntity));
        } catch (Exception e) {
            throw new PersistDataException("StartupEntity not saved: " + e.getMessage());
        }
    }

    @PutMapping
    public StartupEntity update(@RequestBody StartupEntity startupEntity) {
        if (!startupService.isExist(startupEntity.getStartupName())) {
            throw new EntityNotFoundException("StartupEntity  with id: " + startupEntity.getStartupName() + " not found");
        }
        return startupService.update(startupEntity);
    }

    @PatchMapping
    public ResponseEntity<Boolean> merge() {
        try {
            return ResponseEntity.ok(startupService.transformToDatabase());
        } catch (Exception e) {
            throw new PersistDataException("Startups file can not merged: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<StartupEntity> find(@PathVariable String id) {
        if (!startupService.isExist(id)) {
            throw new EntityNotFoundException("StartupEntity  with id: " + id + " not found");
        }
        return ResponseEntity.ok(startupService.find(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable String id) {
        if (!startupService.isExist(id)) {
            throw new EntityNotFoundException("StartupEntity  with id: " + id + " not found");
        }
        startupService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/q", params = {"sector"})
    public ResponseEntity<Page<StartupEntity>> getBySector(@RequestParam String sector, @PageableDefault(size = 10, page = 0, sort = "startupCreatedAt", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            if (sector.isEmpty()) {
                throw new PaginationBoundException("Sector not found");
            }
            return ResponseEntity.ok(startupService.getBySector(sector, pageable));
        } catch (Exception e) {
            throw new PaginationBoundException("Startups not found");
        }
    }
}
