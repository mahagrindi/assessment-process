package studio.farsighted.pfe.api.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "startup-entity")
public class Startup {

    @Id
    @Column(name = "startup_name", unique = true, nullable = false)
    private String startupName;

    @Column(name = "startup_activity_sector", nullable = false)
    private String startupActivitySector;

    @Column(name = "startup_label_date", nullable = false)
    private String startupLabelDate;

    @Column(name = "startup_created_at", nullable = false)
    private String startupCreatedAt;

    @Column(name = "startup_logo")
    private String startupLogo;

    @Column(name = "startup_website")
    private String startupWebsite;

    @Column(name = "startup_email")
    private String startupEmail;

    @Column(name = "startup_phone")
    private String startupPhone;

    @Column(name = "startup_founders")
    private String startupFounders;

    @Column(name = "startup_description", nullable = false, columnDefinition = "TEXT")
    private String startupDescription;

}
