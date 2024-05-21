package studio.farsighted.pfe.api.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

import java.util.List;
import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "program_cohort_challenge")
public class ProgramCohortChallengeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "program-cohort-challenge-title", nullable = false)
    private String challengeTitle;

    @Column(name = "program-cohort-challenge-requirement", nullable = false)
    private String challengeRequirement;

    @Column(name = "program-cohort-challenge-description", nullable = false, columnDefinition = "TEXT")
    private String challengeDescription;

    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "program_cohort_challenge_advantages", joinColumns = @JoinColumn(name = "program_cohort_challenge_id"))
    @Column(name = "program-cohort-challenge-advantages", nullable = false)
    @Cascade({org.hibernate.annotations.CascadeType.ALL})
    private List<String> challengeAdvantages;

    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "program_cohort_challenge_sub", joinColumns = @JoinColumn(name = "program_cohort_challenge_id"))
    @Column(name = "program-cohort-challenge-sub")
    @Cascade({org.hibernate.annotations.CascadeType.ALL})
    private List<String> challengeSub;


    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "program_cohort_challenge_keyword", joinColumns = @JoinColumn(name = "program_cohort_challenge_id"))
    @Column(name = "program-cohort-challenge-keyword")
    @Cascade({org.hibernate.annotations.CascadeType.ALL})
    private List<String> challengeKeyword;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    @JsonIgnore
    private ProgramCohortEntity cohort;

}
