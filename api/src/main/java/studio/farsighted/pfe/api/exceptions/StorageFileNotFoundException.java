package studio.farsighted.pfe.api.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(reason = "StorageInterface file not found", value = org.springframework.http.HttpStatus.NOT_FOUND, code = org.springframework.http.HttpStatus.NOT_FOUND)
public class StorageFileNotFoundException extends StorageException {

    @Serial
    private static final long serialVersionUID = 1L;

    public StorageFileNotFoundException(String message) {
        super(message);
    }

    public StorageFileNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
