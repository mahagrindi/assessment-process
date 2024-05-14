package studio.farsighted.pfe.api.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Axe-entity")
public class AxeEntity {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "axe_id", unique = true, nullable = false)
    private String id;

    private String axe_name;

    private boolean visibility;

    private double note;

    private Date createdAt = new Date();

    private float numberProrgam ;

    private float coefficient;

    private String description ;




    @OneToMany( cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_axe_id" , referencedColumnName = "axe_id" )


    private List<Branch> subAxes ;





}
