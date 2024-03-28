package studio.farsighted.pfe.api.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtResponseDTO {
    private String accessToken;
}
