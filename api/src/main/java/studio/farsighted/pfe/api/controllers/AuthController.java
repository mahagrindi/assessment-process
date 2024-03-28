package studio.farsighted.pfe.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studio.farsighted.pfe.api.DTOs.AuthJwtResponseDTO;
import studio.farsighted.pfe.api.DTOs.AuthLoginRequestDTO;
import studio.farsighted.pfe.api.services.AuthService;

@RestController
@RequestMapping("auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping
    public ResponseEntity<AuthJwtResponseDTO> login(@RequestBody AuthLoginRequestDTO authLoginRequestDTO) {
        AuthJwtResponseDTO authJwtResponseDTO = this.authService.login(authLoginRequestDTO);
        if (authJwtResponseDTO != null) {
            return ResponseEntity.ok(authJwtResponseDTO);
        } else {
            return ResponseEntity.unprocessableEntity().build();
        }
    }

}
