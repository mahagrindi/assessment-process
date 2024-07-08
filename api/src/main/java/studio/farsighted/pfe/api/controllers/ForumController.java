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
import studio.farsighted.pfe.api.models.ForumEntity;
import studio.farsighted.pfe.api.services.ForumService;

import java.util.UUID;

@RestController
@RequestMapping("/api/forum")
@CrossOrigin(origins = "http://localhost:1999 ", allowCredentials = "true", allowedHeaders = "*")
public class ForumController {

    @Autowired
    private ForumService forumService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Page<ForumEntity>> index(@RequestParam(value = "query", required = false) String query, @RequestParam(value = "status", required = false) Boolean status, @PageableDefault(size = 10, page = 0, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            return ResponseEntity.ok(forumService.get(query, status, pageable));
        } catch (Exception e) {
            throw new PersistDataException("Forum not found: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<ForumEntity> show(@PathVariable("id") UUID id) {
        try {
            return ResponseEntity.ok(forumService.find(id));
        } catch (Exception e) {
            throw new PersistDataException("Forum not found: " + e.getMessage());
        }
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<ForumEntity> save(@RequestBody ForumEntity forum) {
        try {
            return ResponseEntity.ok(forumService.save(forum));
        } catch (Exception e) {
            throw new PersistDataException("Forum not saved: " + e.getMessage());
        }
    }

    @PutMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<ForumEntity> update(@RequestBody ForumEntity forum) {
        try {
            return ResponseEntity.ok(forumService.update(forum));
        } catch (Exception e) {
            throw new PersistDataException("Forum not updated: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Boolean> delete(@PathVariable("id") UUID id) {
        try {
            forumService.delete(id);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            throw new PersistDataException("Forum not deleted: " + e.getMessage());
        }
    }

}
