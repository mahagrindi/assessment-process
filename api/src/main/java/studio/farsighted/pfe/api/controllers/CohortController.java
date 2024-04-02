package studio.farsighted.pfe.api.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import studio.farsighted.pfe.api.models.Cohort;
import studio.farsighted.pfe.api.models.StartupEntity;
import studio.farsighted.pfe.api.exceptions.EntityNotFoundException;
import studio.farsighted.pfe.api.exceptions.PersistDataException;
import studio.farsighted.pfe.api.services.CohortService;

// Annotation
@RestController
@RequestMapping("api/cohort")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class CohortController {

   @Autowired
   private CohortService cohortService;

   // Save operation

   @PostMapping
   public ResponseEntity<Cohort> save(@RequestBody Cohort cohort) {
      try {
         return ResponseEntity.ok(cohortService.saveCohort(cohort));
      } catch (Exception e) {
         throw new PersistDataException("cohort not saved: " + e.getMessage());
      }
   }

   // Read operation
   @GetMapping
   public List<Cohort> fetchCohortList() {
      return cohortService.fetchCohortList();
   }

   // Update operation


   @PutMapping("/{id}")
   public Cohort update( @PathVariable("id") String cohortId, @RequestBody Cohort cohort) {

      return cohortService.updateCohort(cohort , cohortId );
   }

   // Delete operation
   @DeleteMapping("/{id}")
   public String deleteCohortById(@PathVariable("id") String cohortId) {
      cohortService.deleteCohortById(cohortId);
      return "Deleted Successfully";
   }
}