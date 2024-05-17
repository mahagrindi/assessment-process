package studio.farsighted.pfe.api.models;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "criteria")
public class Criteria {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id", unique = true, nullable = false)
    private String id;

    @Column(name = "criterianame", nullable = false)
    private String criterionName;

    @Column(name = "sub_cat")
    private String subCategory;
    private boolean visibility;

    @Column(name = "observation")
    private String observation;

    @Column(name = "commentaires")
    private String commentaires;

    @Column(name = "pro")
    private String pro;

    @ManyToOne(fetch = FetchType.LAZY)
    private SubAxeEntity subAxeEntity;



    @Column(name = "cons")
    private String cons;

    @Column(name = "recommendation")
    private String recommendation;

    @Column(name = "note")
    private String note;


}
