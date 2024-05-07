package studio.farsighted.pfe.api.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor

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
private String createdBy ;
    private String version;




    private String title ;
private String  description ;
    @OneToMany( cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_formEvaluation_id" , referencedColumnName = "formEvaluation_id" )
    private List<Challenge> challenges  ;


    @OneToMany( cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_formEvaluation_id" , referencedColumnName = "formEvaluation_id" )
    private List<Section> sections  ;
    public String getId() {
        return id;
    }





}


