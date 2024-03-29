package studio.farsighted.pfe.api.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "datatable-user")
public class UserEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user-full-name", nullable = false)
    private String fullName;

    @Column(name = "user-name", nullable = false)
    private String username;

    @Column(name = "user-email", unique = true, nullable = false)
    private String email;

    @Column(name = "user-password", nullable = false)
    private String password;

    @Column(name = "user-role", nullable = false)
    private String role;

    @Column(name = "user-is-account-non-locked")
    private Boolean isAccountNonLocked = true;

    @Column(name = "user-is-account-non-expired")
    private Boolean isAccountNonExpired = true;

    @Column(name = "user-is-credentials-non-expired")
    private Boolean isCredentialsNonExpired = true;

    @Column(name = "user-is-enabled")
    private Boolean isEnabled = true;

    @CreatedDate
    @Column(name = "user-created-at", updatable = false)
    private Date createdAt = new Date();


    /* Helper Function with the USER-Details */

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorityList = new ArrayList<>();
        String[] roles = role.split(",");
        for (String r : roles) {
            authorityList.add(new SimpleGrantedAuthority(r.trim()));
        }

        return authorityList;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public String getPassword() {
        return this.password;
    }


    @Override
    public boolean isAccountNonExpired() {
        return this.isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return this.isEnabled;
    }
}
