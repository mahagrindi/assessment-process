package studio.farsighted.pfe.api.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponseDTO {

    private Token token;
    private RefreshToken refresh;

    @Data
    @AllArgsConstructor
    public static class Token {
        private String token;
        private Long expiresIn;
    }

    @Data
    @AllArgsConstructor
    public static class RefreshToken {
        private String token;
        private Long expiresIn;
    }

}
