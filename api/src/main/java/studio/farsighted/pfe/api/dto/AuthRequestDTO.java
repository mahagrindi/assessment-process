package studio.farsighted.pfe.api.dto;

import lombok.Data;

@Data
public class AuthRequestDTO {
    private String username;
    private String password;
}
