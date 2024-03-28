package studio.farsighted.pfe.api.components;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import studio.farsighted.pfe.api.interfaces.JsonTokenizerInterface;

import javax.crypto.SecretKey;
import java.io.Serializable;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

/**
 * @title JsonTokenizer
 * @description This class is responsible for generating and validating JWT tokens. It uses the io.jsonwebtoken library to create and parse JWT tokens.
 */
@Component
public class JsonTokenizer implements Serializable, JsonTokenizerInterface {

    /**
     * @title Secret key used to sign the JWT token
     * @description it is a secret cryptographic key used to sign and verify JWTs. It's a piece of information known only to the server that generates and validates the tokens.
     */
    public static SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    /**
     * @param token The JWT token from which to extract the claims
     * @return The claims extracted from the JWT token
     * @title Extracts all claims from the Json web token
     * @description This method parses the JWT token and extracts all of its claims. It uses the `Jwts` builder to create a parser that is configured with the appropriate signing key and then extracts the token’s claims.
     */
    @Override
    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody();
    }

    /**
     * @param token         The JWT token from which to extract the claim
     * @param claimResolver The function used to extract the claim from the token
     * @return The extracted claim
     * @title Extracts a specific claim from the Json web token
     * @description This method extracts a specific claim from the JWT token. It uses the `extractAllClaims` method to parse the token and then applies the provided `claimResolver` function to extract the desired claim.
     */
    @Override
    public <T> T extractClaimFromToken(String token, Function<Claims, T> claimResolver) {
        return claimResolver.apply(extractAllClaims(token));
    }

    /**
     * @param token The JWT token from which to extract the email
     * @return The email extracted from the JWT token
     * @title Extracts the email from the Json web token
     * @description This method extracts the email claim from the JWT token. It uses the `extractClaimFromToken` method to extract the subject claim from the token, which is typically the email address of the user.
     */
    @Override
    public String extractEmailFromToken(String token) {
        return extractClaimFromToken(token, Claims::getSubject);
    }

    /**
     * @param token The JWT token from which to extract the expiration date
     * @return The expiration date extracted from the JWT token
     * @title Extracts the expiration date from the Json web token
     * @description This method extracts the expiration date claim from the JWT token. It uses the `extractClaimFromToken` method to extract the expiration claim from the token, which indicates when the token will expire.
     */
    @Override
    public Date extractExpirationDateFromToken(String token) {
        return extractClaimFromToken(token, Claims::getExpiration);
    }

    /**
     * @param token The JWT token to check for expiration
     * @return True if the token is expired, false otherwise
     * @title Checks if the Json web token is expired
     * @description This method checks if the JWT token has expired. It extracts the expiration date from the token and compares it to the current date to determine if the token is still valid.
     */
    @Override
    public Boolean isTokenExpired(String token) {
        return extractExpirationDateFromToken(token).before(new Date());
    }

    /**
     * @param token
     * @param userDetails
     * @return True if the token is valid, false otherwise
     * @title Validates the Json web token
     * @description This method validates the JWT token by checking if the email claim in the token matches the email of the user details and if the token is not expired.
     */
    // TODO: Add Email as a principal parameter to UserDetails
    @Override
    public Boolean validateToken(String token, UserDetails userDetails) {
        return (extractEmailFromToken(token).equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    /**
     * @param claims
     * @param email
     * @return The generated JWT token
     * @title Generates a Json web token
     * @description This method generates a JWT token using the provided claims and email address. It uses the `Jwts` builder to create a token with the specified claims, subject, and expiration date, and then signs the token with the secret key.
     */
    @Override
    public String generateToken(Map<String, Object> claims, String email) {
        return Jwts.builder().setClaims(claims).setSubject(email).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SECRET_KEY).compact();
    }
}