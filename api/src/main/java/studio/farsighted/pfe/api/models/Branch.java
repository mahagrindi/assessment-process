package studio.farsighted.pfe.api.models;


import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;

@Entity
@Table(name = "Branch")
public class Branch {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id", unique = true, nullable = false)
    private String id;

    private String branchName;
    private Double note;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "axe_id")
    private Axe axe;


    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL)
    private List<Criteria> criteriaList;

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        branchName = branchName;
    }

    public Double getNote() {
        return note;
    }

    public void setNote(Double note) {
        note = note;
    }

    public Axe getAxe() {
        return axe;
    }

    public void setAxe(Axe axe) {
        this.axe = axe;
    }

    public List<Criteria> getCriteriaList() {
        return criteriaList;
    }

    public void setCriteriaList(List<Criteria> criteriaList) {
        this.criteriaList = criteriaList;
    }

    public void setId(String branchId) {
        id = branchId ;
    }

    public String getAxeId() {
        return null ;
    }
}
