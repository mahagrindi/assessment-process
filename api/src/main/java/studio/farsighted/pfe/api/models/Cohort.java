package studio.farsighted.pfe.api.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Cohort-entity")
public class Cohort {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id", unique = true, nullable = false)
    private String id;


    @Column(name = "Cohort_activity_sector", nullable = true)
    private String CohortActivitySector;

    @Column(name = "Cohort_created_at", nullable = true)
    private String CohortCreatedAt;

    @Column(name = "Cohort_end_at", nullable = true)
    private String CohortndAt;

    @Column(name = "Cohort_description", nullable = true, columnDefinition = "TEXT")
    private String CohortDescription;

    @Column(name = "Cohort_name", nullable = true)
    private String CohortName;

}
