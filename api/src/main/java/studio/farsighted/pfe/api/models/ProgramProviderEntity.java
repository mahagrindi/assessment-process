package studio.farsighted.pfe.api.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "datatable-program-provider")
public class ProgramProviderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "program-provider_name", nullable = false)
    private String programClientName;

    @Column(name = "program-provider-logo")
    private String programProviderLogo;

    @Column(name = "program-provider-website")
    private String programProviderWebsite;

}
