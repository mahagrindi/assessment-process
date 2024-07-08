package studio.farsighted.pfe.api.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import studio.farsighted.pfe.api.repositories.AxeRepository;
import studio.farsighted.pfe.api.repositories.StartupRepository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/overview")
@CrossOrigin(origins = "http://localhost:1999", allowCredentials = "true", allowedHeaders = "*")
public class OverViewController {


    @Autowired
    private StartupRepository startupRepository;

    @Autowired
    private AxeRepository axeRepository;


    @GetMapping("/startup-activity-sector")
    public ResponseEntity<List<Map<String, Object>>> getStartupBySector() {
        List<Object[]> results = startupRepository.countStartupsByActivitySector();
        List<Map<String, Object>> response = results.stream()
                .map(result -> Map.of("sector", result[0], "count", result[1]))
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/startup-label-date")
    public ResponseEntity<List<Map<String, Object>>> getStartupByLabelDate() {
        List<Object[]> results = startupRepository.countStartupsByLabelDate();
        List<Map<String, Object>> response = results.stream()
                .map(result -> Map.of("labelDate", result[0], "count", result[1]))
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/startup-createdAt")
    public ResponseEntity<List<Map<String, Object>>> getStartupCountsByCreatedAt() {
        List<Object[]> startupCounts = startupRepository.countStartupsByCreatedAt();

        // Transform Object[] to Map<String, Object> for response
        List<Map<String, Object>> response = startupCounts.stream()
                .map(result -> Map.of("createdAt", result[0], "count", result[1]))
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/axe-status")
    public ResponseEntity<List<Map<String, Object>>> getAxeCountsByStatus() {
        List<Object[]> axeCounts = axeRepository.countAxesByStatus();

        // Transform Object[] to Map<String, Object> for response
        List<Map<String, Object>> response = axeCounts.stream()
                .map(result -> {
                    return Map.<String, Object>of(
                            "status", String.valueOf(result[0]), // Assuming result[0] is boolean
                            "count", ((Number) result[1]).intValue()
                    );
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

}
