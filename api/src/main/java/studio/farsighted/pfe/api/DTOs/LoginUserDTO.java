package studio.farsighted.pfe.api.DTOs;

import lombok.Data;

@Data
public class LoginUserDTO {
    private String email;
    private String password;
}
