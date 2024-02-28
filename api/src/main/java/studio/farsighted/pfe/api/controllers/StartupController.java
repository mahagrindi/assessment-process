package studio.farsighted.pfe.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studio.farsighted.pfe.api.entities.Startup;
import studio.farsighted.pfe.api.exceptions.EntityNotFoundException;
import studio.farsighted.pfe.api.services.StartupService;

import java.util.List;

@RestController
@RequestMapping("api/startups")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class StartupController {

    @Autowired
    private StartupService startupService;

    @GetMapping("")
    public ResponseEntity<List<Startup>> index() {
        return ResponseEntity.ok(startupService.index());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Startup> find(@PathVariable String id) {
        if(!startupService.isExist(id)) {
            throw new EntityNotFoundException("Startup not found with id: " + id);
        }
        return ResponseEntity.ok(startupService.find(id));
    }

    @PostMapping("")
    public Startup save(@RequestBody Startup startup) {
        return startupService.save(startup);
    }

    @PutMapping("")
    public Startup update(@RequestBody Startup startup) {
        return startupService.update(startup);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        startupService.delete(id);
    }

    @PutMapping("/transform")
    public Boolean transformToDatabase() {
        return startupService.transformToDatabase();
    }
}
