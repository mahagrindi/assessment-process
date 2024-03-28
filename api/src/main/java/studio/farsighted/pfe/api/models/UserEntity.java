package studio.farsighted.pfe.api.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;
import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "datatable-user")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user-name", unique = true, nullable = false)
    private String username;

    @Column(name = "user-password", nullable = false)
    private String password;

    @Column(name = "user-role", nullable = false)
    private String role;

    @Column(name = "user-account-non-locked")
    private Boolean isAccountNonLocked = true;

    @CreatedDate
    @Column(name = "user-created-at", nullable = true, updatable = false)
    private Date createdAt = new Date();
}
