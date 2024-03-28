package studio.farsighted.pfe.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import studio.farsighted.pfe.api.dto.AuthRequestDTO;
import studio.farsighted.pfe.api.dto.JwtResponseDTO;
import studio.farsighted.pfe.api.interfaces.JsonTokenizerInterface;

@Service
public class AuthService {

    @Autowired
    private JsonTokenizerInterface jsonTokenizer;

    @Autowired
    private AuthenticationManager authenticationManager;

    public JwtResponseDTO login(AuthRequestDTO authLoginRequestDTO) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authLoginRequestDTO.getUsername(), authLoginRequestDTO.getPassword()));
        if (authentication.isAuthenticated()) {
            return JwtResponseDTO.builder().accessToken(jsonTokenizer.generateToken(authLoginRequestDTO.getUsername())).build();
        } else {
            return null;
        }
    }

}
