package studio.farsighted.pfe.api.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Sub-Axe-entity")
public class SubAxeEntity {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "sub_axe_id", unique = true, nullable = false)

    private String id;

    private String subaxe_name;
    private Double note;
    private boolean visibility;
    private Date createdAt = new Date();




    @OneToMany( cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_sub_axe_id" , referencedColumnName = "sub_axe_id" )
    private List<Criteria> criteriaList;

}
