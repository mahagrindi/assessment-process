package studio.farsighted.pfe.api.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StorageUploadDTO {
    private String name;
    private String url;
}
