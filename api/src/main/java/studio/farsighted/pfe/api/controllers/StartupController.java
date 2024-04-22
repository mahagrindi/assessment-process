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

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/startup")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class StartupController {

    @Autowired
    private StartupService startupService;

    @GetMapping(value = "", params = {"query", "sector"})
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Page<StartupEntity>> index(@RequestParam("query") String query, @RequestParam("sector") String sector, @PageableDefault(size = 10, page = 0, sort = "startupCreatedAt", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            return ResponseEntity.ok(startupService.get(query, sector, pageable));
        } catch (Exception e) {
            throw new PaginationBoundException("Startups not found");
        }
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<StartupEntity> save(@RequestBody StartupEntity startupEntity) {
        try {
            return ResponseEntity.ok(startupService.save(startupEntity));
        } catch (Exception e) {
            throw new PersistDataException("StartupEntity not saved: " + e.getMessage());
        }
    }

    @PutMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public StartupEntity update(@RequestBody StartupEntity startupEntity) {
        if (!startupService.isExist(startupEntity.getId())) {
            throw new EntityNotFoundException("StartupEntity  with id: " + startupEntity.getStartupName() + " not found");
        }
        return startupService.update(startupEntity);
    }

    @PatchMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Boolean> merge() {
        try {
            return ResponseEntity.ok(startupService.transformToDatabase());
        } catch (Exception e) {
            throw new PersistDataException("Startups file can not merged: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<StartupEntity> find(@PathVariable("id") UUID id) {
        if (!startupService.isExist(id)) {
            throw new EntityNotFoundException("StartupEntity  with id: " + id + " not found");
        }
        return ResponseEntity.ok(startupService.find(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<StartupEntity> delete(@PathVariable("id") UUID id) {
        StartupEntity startupEntity = startupService.find(id);
        if (!startupService.isExist(id)) {
            throw new EntityNotFoundException("StartupEntity  with id: " + id + " not found");
        }
        try {
            startupService.delete(id);
            return ResponseEntity.ok(startupEntity);
        } catch (Exception e) {
            throw new PersistDataException("StartupEntity not deleted: " + e.getMessage());
        }
    }

    @GetMapping("/activity-sector")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<List<String>> getDistinctSector() {
        try {
            return ResponseEntity.ok(startupService.getDistinctSector());
        } catch (Exception e) {
            throw new PaginationBoundException("Sector not found");
        }
    }

}
