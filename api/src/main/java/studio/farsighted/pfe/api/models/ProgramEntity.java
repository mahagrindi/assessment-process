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
@Table(name = "datatable-program")
public class ProgramEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "program-logo", nullable = false)
    private String programPicture;

    @Column(name = "program-name", nullable = false)
    private String programName;

    @Column(name = "program-industry", nullable = false)
    private String programIndustry;

    @Column(name = "program-description", nullable = false, columnDefinition = "TEXT")
    private String programDescription;

    @Column(name = "program-start-date", nullable = false)
    private Date programStartDate;

    @Column(name = "program-end-date")
    private Date programEndDate;

    @Column(name = "program-duration", nullable = false)
    private Integer programEstimatedDuration;

    @Column(name = "program-status")
    private String programStatus;

    @CreatedDate
    @Column(name = "program-created-at", updatable = false)
    private Date createdAt = new Date();

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(referencedColumnName = "id")
    private ProgramProviderEntity provider;

    @OneToMany(mappedBy = "program", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProgramCohortEntity> cohorts;

}
