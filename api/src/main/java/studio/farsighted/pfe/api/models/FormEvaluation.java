package studio.farsighted.pfe.api.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "FormEvaluation")
public class FormEvaluation {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "formEvaluation_id", unique = true, nullable = false)
    private String id;

    @CreatedDate
    @Column(name = "Form_created_at", updatable = false)
    private Date createdAt = new Date();

    private String version;

    @OneToMany( cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_formEvaluation_id" , referencedColumnName = "formEvaluation_id" )
    private List<Challenge> challenges  ;


    @OneToMany( cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_formEvaluation_id" , referencedColumnName = "formEvaluation_id" )
    private List<Section> sections  ;
    public String getId() {
        return id;
    }

    public List<Section> getSection() {
        return sections;
    }

    public void setSection(List<Section> section) {
        this.sections = section;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public List<Challenge> getChallenges() {
        return challenges;
    }

    public void setChallenges(List<Challenge> challenges) {
        this.challenges = challenges;
    }
}


