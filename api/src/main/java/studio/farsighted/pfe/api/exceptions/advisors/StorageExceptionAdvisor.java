package studio.farsighted.pfe.api.exceptions.advisors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import studio.farsighted.pfe.api.exceptions.StorageException;

import java.time.LocalDateTime;
import java.util.HashMap;

@ControllerAdvice
public class StorageExceptionAdvisor {

    @ExceptionHandler(StorageException.class)
    public ResponseEntity<Object> handlePersistDataException(StorageException ex) {
        return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(new HashMap<>(
                new HashMap<>() {{
                    put("timestamp", LocalDateTime.now());
                    put("status", HttpStatus.BAD_REQUEST.value());
                    put("error", "Storage Error");
                    put("message", ex.getMessage());
                }}
        ));
    }
}
