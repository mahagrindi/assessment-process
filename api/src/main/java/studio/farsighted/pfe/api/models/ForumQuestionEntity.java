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
@Table(name = "datatable-forum-question")
public class ForumQuestionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "form-question-name", nullable = false)
    private String questionName;

    @Column(name = "form-question-hint", columnDefinition = "TEXT")
    private String questionHint;

    @Column(name = "form-question-type")
    private String questionType;

    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "datatable-forum-question_options", joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "datatable-forum-question_options")
    @Cascade({org.hibernate.annotations.CascadeType.ALL})
    private List<String> options;

    @Column(name = "form-question-order")
    private Integer questionOrder = 1;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    @JsonIgnore
    private ForumEntity forum;

}
