package studio.farsighted.pfe.api.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "datatable-file")
public class StorageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "file-name", nullable = false)
    private String filename;

    @Column(name = "file-path", nullable = false)
    private String filePath;

    @Column(name = "file-type", nullable = false)
    private String fileType;

    @Column(name = "file-size", nullable = false)
    private Integer fileSize;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "file-user-id", referencedColumnName = "id")
    private UserEntity user;

}
