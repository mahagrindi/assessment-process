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

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/program")
@CrossOrigin(origins = "http://localhost:1999 ", allowCredentials = "true", allowedHeaders = "*")
public class ProgramController {
    @Autowired
    private ProgramService programService;

    @GetMapping(value = "", params = {"query", "status"})
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Page<ProgramEntity>> index(@RequestParam(value = "query", required = false) String query, @RequestParam(value = "status", required = false) String status, @PageableDefault(size = 10, page = 0, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            return ResponseEntity.ok(programService.get(query, status, pageable));
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
    public ResponseEntity<ProgramEntity> delete(@PathVariable("id") UUID id) {
        ProgramEntity program = programService.find(id);
        if (!programService.isExist(id)) {
            throw new PersistDataException("Program with id: " + id + " not found");
        }

        try {
            programService.delete(id);
            return ResponseEntity.ok(program);
        } catch (Exception e) {
            throw new PersistDataException("Program with id: " + id + " not deleted: " + e.getMessage());
        }
    }

    @GetMapping("/list-programs")
    public ResponseEntity<List<ProgramEntity>> list() {
        return ResponseEntity.ok(programService.getList());
    }

}
