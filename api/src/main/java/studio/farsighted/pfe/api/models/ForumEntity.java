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
@Table(name = "datatable-forum")
public class ForumEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "forum-name", unique = true, nullable = false)
    private String formName;

    @Column(name = "forum-description")
    private String formDescription;

    @Column(name = "forum-status")
    private Boolean status = false;

    @OneToOne
    @JoinColumn(referencedColumnName = "id")
    private ProgramCohortEntity programCohortEntity;


    @CreatedDate
    @Column(name = "forum-created-at", updatable = false)
    private Date createdAt = new Date();

    @OneToMany(mappedBy = "forum", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ForumQuestionEntity> questions;
    
}
