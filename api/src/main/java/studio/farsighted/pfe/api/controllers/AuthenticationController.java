package studio.farsighted.pfe.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
@CrossOrigin(origins = "http://localhost:1999", allowCredentials = "true", allowedHeaders = "*")
public class AuthenticationController {
    @Autowired
    private JsonWebTokenizer jwt;

    @Autowired
    private AuthenticationService authenticationService;

    @GetMapping("/me")
    public ResponseEntity<UserEntity> authenticatedUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserEntity currentUser = (UserEntity) authentication.getPrincipal();
            return new ResponseEntity<>(currentUser, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

//    @PostMapping("/refresh")
//    public ResponseEntity<JwtResponseDTO> refresh(@RequestBody Map<String, String> request) {
//        if (request.get("refreshToken") == null) {
//            return ResponseEntity.badRequest().build();
//        }
//
//        try {
//            UserEntity currentUser = jwt.extractClaim(request.get("refreshToken"), jwt::extractUsername);
//            JwtResponseDTO responseDTO = new JwtResponseDTO(
//                    new JwtResponseDTO.Token(jwt.generateToken(currentUser), jwt.getExpirationTime()),
//                    new JwtResponseDTO.RefreshToken(jwt.generateRefreshToken(currentUser), jwt.getRefreshExpirationTime())
//            );
//            return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//
//    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponseDTO> authenticate(@RequestBody LoginUserDTO loginUserDto) throws Exception {
        UserEntity authenticatedUser = authenticationService.login(loginUserDto);

        JwtResponseDTO responseDTO = new JwtResponseDTO(
                new JwtResponseDTO.Token(jwt.generateToken(authenticatedUser), jwt.getExpirationTime()),
                new JwtResponseDTO.RefreshToken(jwt.generateRefreshToken(authenticatedUser), jwt.getRefreshExpirationTime())
        );

        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

}
