package studio.farsighted.pfe.api.services;


import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.web.multipart.MultipartFile;
import studio.farsighted.pfe.api.config.StorageUploadConfiguration;
import studio.farsighted.pfe.api.exceptions.StorageException;
import studio.farsighted.pfe.api.exceptions.StorageFileNotFoundException;
import studio.farsighted.pfe.api.interfaces.StorageInterface;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

@Service
public class StorageService implements StorageInterface {

    private final Path root;

    @Autowired
    public StorageService(StorageUploadConfiguration properties) {
        this.root = Paths.get(properties.getLocation())
                .toAbsolutePath()
                .normalize();
    }


    @Override
    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(this.root);
        } catch (IOException e) {
            throw new StorageException("Could not initialize storage : " + e.getMessage());
        }
    }

    @Override
    public String store(MultipartFile file) {
        try {
            String hashedFileName = DigestUtils.md5DigestAsHex(Objects.requireNonNull(file.getOriginalFilename()).getBytes()) + "." + Objects.requireNonNull(file.getOriginalFilename()).split("\\.")[1];
            Files.copy(file.getInputStream(), this.root.resolve(hashedFileName), java.nio.file.StandardCopyOption.REPLACE_EXISTING);
            return hashedFileName;
        } catch (Exception e) {
            throw new StorageException("Failed to store file : " + e.getMessage());
        }
    }

    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path file = this.root.resolve(filename).normalize();
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new StorageFileNotFoundException("Could not read file : " + filename);
            }

        } catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file : " + e.getMessage());
        }
    }

    @Override
    public Boolean delete(String filename) {
        Path file = this.root.resolve(filename);
        try {
            return Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new StorageException("Could not delete file : " + e.getMessage());
        }
    }

}
