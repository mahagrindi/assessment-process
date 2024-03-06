package studio.farsighted.pfe.api.exceptions.advisors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import studio.farsighted.pfe.api.exceptions.PaginationBoundException;

import java.time.LocalDateTime;
import java.util.HashMap;

@ControllerAdvice
public class PaginationBoundExceptionAdvisor {

    @ExceptionHandler(PaginationBoundException.class)
    public ResponseEntity<Object> handlePaginationBoundException(PaginationBoundException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new HashMap<>(
                new HashMap<>() {{
                    put("timestamp", LocalDateTime.now());
                    put("status", HttpStatus.BAD_REQUEST.value());
                    put("error", "Pagination Bound Error");
                    put("message", ex.getMessage());
                }}
        ));
    }

}
