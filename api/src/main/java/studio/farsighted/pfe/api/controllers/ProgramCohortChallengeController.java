package studio.farsighted.pfe.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import studio.farsighted.pfe.api.exceptions.PersistDataException;
import studio.farsighted.pfe.api.models.ProgramCohortChallengeEntity;
import studio.farsighted.pfe.api.services.ProgramCohortChallengeService;

import java.util.UUID;

@RestController
@RequestMapping("/api/program/cohort/challenge")
@CrossOrigin(origins = "http://localhost:1999 ", allowCredentials = "true", allowedHeaders = "*")
public class ProgramCohortChallengeController {

    @Autowired
    private ProgramCohortChallengeService programCohortChallengeService;

    @GetMapping(value = "/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<ProgramCohortChallengeEntity> show(@PathVariable UUID id) {
        try {
            return new ResponseEntity<>(programCohortChallengeService.find(id), HttpStatus.OK);
        } catch (Exception e) {
            throw new PersistDataException("Program Cohort Challenge not found: " + e.getMessage());
        }
    }

    @PostMapping(value = "", params = {"cohortId"})
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<ProgramCohortChallengeEntity> save(@RequestParam(value = "cohortId") UUID id, @RequestBody ProgramCohortChallengeEntity programCohortChallenge) {
        try {
            return new ResponseEntity<>(programCohortChallengeService.save(id, programCohortChallenge), HttpStatus.CREATED);
        } catch (Exception e) {
            throw new PersistDataException("Program Cohort Challenge not saved: " + e.getMessage());
        }
    }

    @PutMapping(value = "/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<ProgramCohortChallengeEntity> update(@RequestBody ProgramCohortChallengeEntity programCohortChallenge) {
        try {
            return new ResponseEntity<>(programCohortChallengeService.update(programCohortChallenge), HttpStatus.OK);
        } catch (Exception e) {
            throw new PersistDataException("Program Cohort Challenge not updated: " + e.getMessage());
        }
    }

    @DeleteMapping(value = "/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
        try {
            programCohortChallengeService.delete(id);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            throw new PersistDataException("Program Cohort Challenge not deleted: " + e.getMessage());
        }
    }

}
