package studio.farsighted.pfe.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
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

    @GetMapping
    public ResponseEntity<Page<UserEntity>> index(@PageableDefault(size = 10, page = 0, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            return ResponseEntity.ok(userService.getAll(pageable));
        } catch (Exception e) {
            throw new PaginationBoundException("Startups not found");
        }
    }

    @PostMapping
    public ResponseEntity<UserEntity> save(@RequestBody UserEntity user) {
        try {
            return ResponseEntity.ok(userService.save(user));
        } catch (Exception e) {
            throw new PersistDataException("StartupEntity not saved: " + e.getMessage());
        }
    }

    @PutMapping
    public UserEntity update(@RequestBody UserEntity user) {
        if (!userService.isExist(user.getId())) {
            throw new PersistDataException("User with id: " + user.getId() + " not found");
        }
        return userService.update(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> find(@PathVariable UUID id) {
        if (!userService.isExist(id)) {
            throw new PersistDataException("User with id: " + id + " not found");
        }
        return ResponseEntity.ok(userService.find(id));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        userService.delete(id);
    }

}
