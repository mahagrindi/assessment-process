package studio.farsighted.pfe.api.exceptions.advisors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import studio.farsighted.pfe.api.exceptions.PersistDataException;

import java.time.LocalDateTime;
import java.util.HashMap;

@ControllerAdvice
public class PersistDataExceptionAdvisor {

    @ExceptionHandler(PersistDataException.class)
    public ResponseEntity<Object> handlePersistDataException(PersistDataException ex) {
        return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(new HashMap<>(
                new HashMap<>() {{
                    put("timestamp", LocalDateTime.now());
                    put("status", HttpStatus.BAD_REQUEST.value());
                    put("error", "Data Already Persisted Error");
                    put("message", ex.getMessage());
                }}
        ));
    }

}
