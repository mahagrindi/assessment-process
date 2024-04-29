package studio.farsighted.pfe.api.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties("storage.file")
public class StorageUploadConfiguration {
    private String location;
}
