package studio.farsighted.pfe.api.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import studio.farsighted.pfe.api.DTOs.StorageUploadDTO;
import studio.farsighted.pfe.api.exceptions.StorageException;
import studio.farsighted.pfe.api.services.StorageService;

@RestController
@RequestMapping("api/files")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class StorageController {

    @Autowired
    private StorageService storageService;

    @GetMapping("{file:.+}")
    public ResponseEntity<Resource> GET(@PathVariable("file") String file) {
        Resource resource = storageService.loadAsResource(file);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @PostMapping
    public ResponseEntity<StorageUploadDTO> POST(@RequestParam("file") MultipartFile file) {
        try {
            String uploadedFile = storageService.store(file);
            return ResponseEntity.status(HttpStatus.OK).body(new StorageUploadDTO(uploadedFile, ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/files/").path(uploadedFile).toUriString()));
        } catch (Exception e) {
            throw new StorageException("Failed to upload file : " + e.getMessage());
        }
    }

}
