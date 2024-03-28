package studio.farsighted.pfe.api.models;

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
@Table(name = "datatable-startup")
public class StartupEntity {

    @Id
    @Column(name = "startup-name", unique = true, nullable = false)
    private String startupName;

    @Column(name = "startup-activity-sector", nullable = false)
    private String startupActivitySector;

    @Column(name = "startup-label-date", nullable = false)
    private String startupLabelDate;

    @Column(name = "startup-created-at", nullable = false)
    private String startupCreatedAt;

    @Column(name = "startup-logo")
    private String startupLogo;

    @Column(name = "startup-website")
    private String startupWebsite;

    @Column(name = "startup-email")
    private String startupEmail;

    @Column(name = "startup-phone")
    private String startupPhone;

    @Column(name = "startup-founders")
    private String startupFounders;

    @Column(name = "startup-description", nullable = false, columnDefinition = "TEXT")
    private String startupDescription;

}
