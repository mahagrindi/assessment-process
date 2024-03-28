package studio.farsighted.pfe.api.DAOs;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import studio.farsighted.pfe.api.models.UserEntity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class CustomUserDetails extends UserEntity implements UserDetails {

    private final String username;
    private final String password;
    private final Boolean isAccountNonLocked;
    Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(UserEntity user) {
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.isAccountNonLocked = user.getIsAccountNonLocked();
        this.authorities = parseAuthorities(user.getRole());
    }

    private List<GrantedAuthority> parseAuthorities(String role) {
        List<GrantedAuthority> authorityList = new ArrayList<>();
        String[] roles = role.replaceAll("\\[|\\]|\\s", "").split(",");
        for (String r : roles) {
            authorityList.add(new SimpleGrantedAuthority(r.trim()));
        }
        return authorityList;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
