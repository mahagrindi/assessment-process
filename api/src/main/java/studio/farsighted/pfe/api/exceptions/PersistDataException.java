package studio.farsighted.pfe.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(reason = "Persist data exception", value = HttpStatus.ALREADY_REPORTED, code = HttpStatus.ALREADY_REPORTED)
public class PersistDataException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public PersistDataException(String message) {
        super(message);
    }

    public PersistDataException(String message, Throwable cause) {
        super(message, cause);
    }

}
