package studio.farsighted.pfe.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Table(name = "datatable-axe-sub")
public class AxeSubEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "axe-sub-name", unique = true)
    private String axeSubName;

    @Column(name = "axe-sub-description", columnDefinition = "TEXT")
    private String axeSubDescription;

    @Column(name = "axe-sub-status", columnDefinition = "BOOLEAN DEFAULT TRUE")
    private boolean status = true;

    @Column(name = "axe-sub-weight", columnDefinition = "FLOAT DEFAULT 0")
    private Integer axeSubWeight;

    @CreatedDate
    @Column(name = "user-created-at", updatable = false)
    private Date createdAt = new Date();

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    @JsonIgnoreProperties("axeSubs")
    private AxeEntity axe;

    @OneToMany(mappedBy = "axeSub", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<AxeSubCriteriaEntity> criterias;

    @Column(name = "axe-sub-criteria-count")
    private Integer criteriaCount;

    @PostLoad
    private void postLoad() {
        if (criterias != null) {
            criteriaCount = criterias.size();
        }
    }

}
