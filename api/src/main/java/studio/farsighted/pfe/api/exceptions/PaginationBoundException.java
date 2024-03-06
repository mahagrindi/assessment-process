package studio.farsighted.pfe.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(reason = "Pagination bound exception", value = HttpStatus.BAD_REQUEST, code = HttpStatus.BAD_REQUEST)
public class PaginationBoundException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public PaginationBoundException(String message) {
        super(message);
    }

    public PaginationBoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
