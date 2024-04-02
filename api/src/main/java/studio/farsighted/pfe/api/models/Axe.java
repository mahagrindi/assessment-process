package studio.farsighted.pfe.api.models;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Axe {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id", unique = true, nullable = false)
    private String id;
    private String axe_name;
    private boolean visibility;
    private double note;


    @OneToMany(mappedBy = "axe", cascade = CascadeType.ALL)
    private List<Branch> branches = new ArrayList<>();
    public String getAxe_name() {
        return axe_name;
    }

    public void setAxe_name(String axe_name) {
        this.axe_name = axe_name;
    }

    public boolean isVisibility() {
        return visibility;
    }

    public void setVisibility(boolean visibility) {
        this.visibility = visibility;
    }

    public double getNote() {
        return note;
    }

    public void setNote(double note) {
        this.note = note;
    }

    public List<Branch> getBranches() {
        return branches;
    }

    public void setBranches(List<Branch> branches) {
        this.branches = branches;
    }



}
