package studio.farsighted.pfe.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import studio.farsighted.pfe.api.models.Challenge;
import studio.farsighted.pfe.api.services.ChallengesService;

import java.util.List;

@RestController
@RequestMapping("/api/challenges")
@CrossOrigin(origins = "http://localhost:1999", allowCredentials = "true", allowedHeaders = "*")
public class ChallengesController {

    @Autowired
    private ChallengesService challengesService;



    /* API GET  All  */
    @GetMapping(value = "" )
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public List<Challenge> getAll() {

            return challengesService.getAll();

    }
}


