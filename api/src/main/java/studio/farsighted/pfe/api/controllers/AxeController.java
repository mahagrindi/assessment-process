package studio.farsighted.pfe.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studio.farsighted.pfe.api.models.Axe;
import studio.farsighted.pfe.api.models.Branch;
import studio.farsighted.pfe.api.services.AxeService;

import java.util.List;

@RestController
@RequestMapping("/api/axes")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")

public class AxeController {

    @Autowired
    private AxeService axeService;

    @PostMapping("/")
    public ResponseEntity<?> createAxe(@RequestBody Axe axe) {
        if (axe.getAxe_name() == null || axe.getAxe_name().isEmpty()) {
            return ResponseEntity.badRequest().body("Axe name is required");
        }

        Axe savedAxe = axeService.saveAxe(axe);
        return ResponseEntity.ok(savedAxe);
    }


    @GetMapping("/")
    public List<Axe> getAllAxes() {
        return axeService.fetchAxeList();
    }

   @GetMapping("/{id}")
    public Axe getAxeById(@PathVariable String id) {
        return axeService.axeById(id);
    }

    @PutMapping("/{id}")
    public Axe updateAxe(@PathVariable String id, @RequestBody Axe updatedAxe) {
        return axeService.updateAxe(updatedAxe ,id);    }




    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAxe(@PathVariable String id) {
      return  axeService.deleteAxeById(id);

    }

    @PostMapping("/add-branch/{axeId}")
    public  Axe addBranchToAxe(@PathVariable String axeId, @RequestBody Branch branch) {
        return axeService.addBranchToAxe(axeId , branch).getAxe();
    }

}