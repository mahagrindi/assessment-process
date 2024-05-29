package studio.farsighted.pfe.api.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "datatable-axe")
public class AxeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "axe-name", unique = true)
    private String axeName;

    @Column(name = "axe-description", columnDefinition = "TEXT")
    private String axeDescription;

    @Column(name = "axe-status", columnDefinition = "BOOLEAN DEFAULT TRUE")
    private boolean status = true;

    @CreatedDate
    @Column(name = "user-created-at", updatable = false)
    private Date createdAt = new Date();

    @OneToMany(mappedBy = "axe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AxeSubEntity> axeSubs;

}
