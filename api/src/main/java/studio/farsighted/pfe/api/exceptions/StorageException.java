package studio.farsighted.pfe.api.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(reason = "StorageInterface exception", value = org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR, code = org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR)
public class StorageException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public StorageException(String message) {
        super(message);
    }

    public StorageException(String message, Throwable cause) {
        super(message, cause);
    }
}
