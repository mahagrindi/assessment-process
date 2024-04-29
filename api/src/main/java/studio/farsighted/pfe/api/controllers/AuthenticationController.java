package studio.farsighted.pfe.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import studio.farsighted.pfe.api.DTOs.JwtResponseDTO;
import studio.farsighted.pfe.api.DTOs.LoginUserDTO;
import studio.farsighted.pfe.api.components.JsonWebTokenizer;
import studio.farsighted.pfe.api.models.UserEntity;
import studio.farsighted.pfe.api.services.AuthenticationService;

@RestController
@RequestMapping("auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class AuthenticationController {
    @Autowired
    private JsonWebTokenizer jwt;

    @Autowired
    private AuthenticationService authenticationService;

    @GetMapping("/me")
    public ResponseEntity<UserEntity> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserEntity currentUser = (UserEntity) authentication.getPrincipal();

        return ResponseEntity.ok(currentUser);
    }

    @PostMapping("/signup")
    public ResponseEntity<UserEntity> register(@RequestBody UserEntity registerUserDto) {
        UserEntity registeredUser = authenticationService.register(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponseDTO> authenticate(@RequestBody LoginUserDTO loginUserDto) {
        UserEntity authenticatedUser = authenticationService.login(loginUserDto);

        String jwtToken = jwt.generateToken(authenticatedUser);

        JwtResponseDTO loginResponse = new JwtResponseDTO(jwtToken, jwt.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }
}
