package studio.farsighted.pfe.api.entities;

import jakarta.persistence.*;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "startup_name", unique = true, nullable = false)
    private String startupName;

    @Column(name = "startup_activity_sector", nullable = false)
    private String startupActivitySector;

    @Column(name = "startup_label_date")
    private String startupLabelDate;

    @Column(name = "startup_created_at", nullable = false)
    private String startupCreatedAt;

    @Column(name = "startup_logo")
    private String startupLogo;

    @Column(name = "startup_website", unique = true)
    private String startupWebsite;

    @Column(name = "startup_email", unique = true, nullable = true)
    private String startupEmail;

    @Column(name = "startup_phone", unique = true, nullable = true)
    private String startupPhone;

    @Column(name = "startup_founders", nullable = true)
    private String startupFounders;

    @Column(name = "startup_description", nullable = false)
    private String startupDescription;

}
