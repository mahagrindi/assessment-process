package studio.farsighted.pfe.api.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "datatable-program-cohort")
public class ProgramCohortEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "program-cohort-name", nullable = false)
    private String cohortName;

    @Column(name = "program-cohort-description")
    private String cohortDescription;

    @Column(name = "program-cohort-start-date", nullable = false)
    private Date cohortStartDate;

    @Column(name = "program-cohort-end-date")
    private Date cohortEndDate;

    @Column(name = "program-cohort-duration", nullable = false)
    private Integer cohortDuration;

    @Column(name = "program-cohort-status", nullable = false)
    private String cohortStatus;

    @ManyToOne()
    @JoinColumn(referencedColumnName = "id")
    @JsonIgnoreProperties("cohorts")
    private ProgramEntity program;

    @OneToMany(mappedBy = "cohort", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProgramCohortChallengeEntity> challenges;

}
