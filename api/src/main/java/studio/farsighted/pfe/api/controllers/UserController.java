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
import studio.farsighted.pfe.api.models.UserEntity;
import studio.farsighted.pfe.api.services.UserService;

import java.util.UUID;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "", params = {"query", "title", "role", "dep"})
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Page<UserEntity>> index(@RequestParam("query") String query, @RequestParam("title") String title, @RequestParam("role") String role, @RequestParam("dep") String dep, @PageableDefault(size = 10, page = 0, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            return ResponseEntity.ok(userService.get(query, title, role, dep, pageable));
        } catch (Exception e) {
            throw new PaginationBoundException("User not found");
        }
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<UserEntity> save(@RequestBody UserEntity user) {
        try {
            return ResponseEntity.ok(userService.save(user));
        } catch (Exception e) {
            throw new PersistDataException("User not saved: " + e.getMessage());
        }
    }

    @PutMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public UserEntity update(@RequestBody UserEntity user) {
        if (!userService.isExist(user.getId())) {
            throw new PersistDataException("User with id: " + user.getId() + " not found");
        }
        return userService.update(user);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<UserEntity> find(@PathVariable("id") UUID id) {
        if (!userService.isExist(id)) {
            throw new PersistDataException("User with id: " + id + " not found");
        }
        return ResponseEntity.ok(userService.find(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public void delete(@PathVariable("id") UUID id) {
        userService.delete(id);
    }

    @GetMapping("/departments")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> getDistinctDepartment() {
        try {
            return ResponseEntity.ok(userService.getDistinctDepartment());
        } catch (Exception e) {
            throw new PersistDataException("Departments not found: " + e.getMessage());
        }
    }

    @GetMapping("/job-titles")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> getDistinctJobTitles() {
        try {
            return ResponseEntity.ok(userService.getDistinctJobTitles());
        } catch (Exception e) {
            throw new PersistDataException("Job titles not found: " + e.getMessage());
        }
    }

}
