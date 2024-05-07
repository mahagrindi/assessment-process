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
import studio.farsighted.pfe.api.models.ProgramEntity;
import studio.farsighted.pfe.api.services.ProgramService;

import java.util.UUID;

@RestController
@RequestMapping("/api/program")
@CrossOrigin(origins = "http://localhost:1999 ", allowCredentials = "true", allowedHeaders = "*")
public class ProgramController {
    @Autowired
    private ProgramService programService;

    @GetMapping(value = "", params = {"query", "status", "industry"})
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Page<ProgramEntity>> index(@RequestParam(value = "query", required = false) String query, @RequestParam(value = "status", required = false) String status, @RequestParam(value = "industry", required = false) String industry, @PageableDefault(size = 10, page = 0, sort = "programEstimatedDuration", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            return ResponseEntity.ok(programService.get(query, status, industry, pageable));
        } catch (Exception e) {
            throw new PaginationBoundException("Programs not found: " + e.getMessage());
        }
    }


    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<ProgramEntity> save(@RequestBody ProgramEntity program) {
        try {
            return ResponseEntity.ok(programService.save(program));
        } catch (Exception e) {
            throw new PersistDataException("Program not saved: " + e.getMessage());
        }
    }

    @PutMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ProgramEntity update(@RequestBody ProgramEntity program) {
        if (!programService.isExist(program.getId())) {
            throw new PersistDataException("Program with id: " + program.getId() + " not found");
        }
        return programService.update(program);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<ProgramEntity> find(@PathVariable("id") UUID id) {
        if (!programService.isExist(id)) {
            throw new PersistDataException("Program with id: " + id + " not found");
        }
        return ResponseEntity.ok(programService.find(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public void delete(@PathVariable("id") String id) {
        programService.delete(id);
    }

}
