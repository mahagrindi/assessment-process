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

    @Column(name = "user-email", unique = true, nullable = false)
    private String username;

    @Column(name = "user-password", nullable = false)
    private String password;

    @Column(name = "user-role", nullable = false)
    private String role;

    @Column(name = "user-is-account-non-locked")
    private Boolean accountNonLocked = true;

    @Column(name = "user-is-account-non-expired")
    private Boolean accountNonExpired = true;

    @Column(name = "user-is-credentials-non-expired")
    private Boolean credentialsNonExpired = true;

    @Column(name = "user-is-enabled")
    private Boolean enabled = true;

    @CreatedDate
    @Column(name = "user-created-at", updatable = false)
    private Date createdAt = new Date();

    /* User profile columns */
    @Column(name = "user-first-name", nullable = false)
    private String firstName;

    @Column(name = "user-last-name", nullable = false)
    private String lastName;

    @Column(name = "user-middle-name")
    private String middleName;

    @Column(name = "user-badge-number", nullable = false)
    private String badgeNumber;

    @Column(name = "user-job-title")
    private String jobTitle;

    @Column(name = "user-department")
    private String department;

    @Column(name = "user-phone-number")
    private String phoneNumber;

    @Column(name = "user-ey-employee")
    private Boolean eyEmployee = true;

    @Column(name = "user-profile-image")
    private String profileImage;

    @Column(name = "user-notes")
    private String notes;

    @Column(name = "user-can-asset")
    private Boolean isEligibleForEvaluation = false;

    @Column(name = "user-cin", unique = true, nullable = false)
    private String cin;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorityList = new ArrayList<>();
        String[] roles = Arrays.stream(this.role.split(",")).sorted().toArray(String[]::new);
        for (String r : roles) {
            authorityList.add(new SimpleGrantedAuthority(r.trim()));
        }
        return authorityList;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

}
