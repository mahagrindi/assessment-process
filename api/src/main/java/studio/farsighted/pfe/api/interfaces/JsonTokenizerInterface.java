package studio.farsighted.pfe.api.interfaces;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.function.Function;

public interface JsonTokenizerInterface {
    Claims extractAllClaims(String token);

    <T> T extractClaimFromToken(String token, Function<Claims, T> claimResolver);

    String extractUsernameFromToken(String token);

    Date extractExpirationDateFromToken(String token);

    Boolean isTokenExpired(String token);

    Boolean validateToken(String token, UserDetails userDetails);

    String generateToken(String username);
}
