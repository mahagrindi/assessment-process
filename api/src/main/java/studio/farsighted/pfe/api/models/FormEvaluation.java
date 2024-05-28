package studio.farsighted.pfe.api.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "form_evaluation")
public class FormEvaluation {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "form_evaluation_id", unique = true, nullable = false)
    private String id;

    @CreatedDate
    @Column(name = "form_created_at", updatable = false)
    private Date createdAt = new Date();

    private String createdBy;
    private String version;
    private String title;
    @Column(columnDefinition = "LONGTEXT")
    private String description;

    @ElementCollection
    @CollectionTable(name = "form_evaluation_challenges", joinColumns = @JoinColumn(name = "form_evaluation_id"))
    @Column(name = "challenge_id")
    private List<String> challengeIds;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_form_evaluation_id", referencedColumnName = "form_evaluation_id")
    private List<Section> sections;
}
