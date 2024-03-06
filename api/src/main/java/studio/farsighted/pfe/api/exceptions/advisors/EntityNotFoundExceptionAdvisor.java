package studio.farsighted.pfe.api.exceptions.advisors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import studio.farsighted.pfe.api.exceptions.EntityNotFoundException;

import java.time.LocalDateTime;
import java.util.HashMap;

@ControllerAdvice
public class EntityNotFoundExceptionAdvisor {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Object> handleEntityNotFoundException(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new HashMap<>(
                new HashMap<>() {{
                    put("timestamp", LocalDateTime.now());
                    put("status", HttpStatus.NOT_FOUND.value());
                    put("error", "Not Found");
                    put("message", ex.getMessage());
                }}
        ));
    }

}
