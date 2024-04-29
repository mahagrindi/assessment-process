package studio.farsighted.pfe.api.interfaces;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface StorageInterface {
    void init();

    String store(MultipartFile file);

    Resource loadAsResource(String filename);

    Boolean delete(String filename);
}
