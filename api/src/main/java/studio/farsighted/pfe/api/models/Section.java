package studio.farsighted.pfe.api.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "Sections")
public class Section {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "section_id", unique = true, nullable = false)

    private Long id;


    private String title;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @OneToMany( cascade = CascadeType.ALL)
    @JoinColumn(name = "section_id" , referencedColumnName = "section_id" )
    private List<Question> questions  ;



    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}
