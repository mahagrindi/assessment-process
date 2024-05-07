package studio.farsighted.pfe.api.exceptions.advisors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import studio.farsighted.pfe.api.exceptions.StorageFileNotFoundException;

import java.time.LocalDateTime;
import java.util.HashMap;

@ControllerAdvice
public class StorageFileNotFoundExceptionAdvisor {

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<Object> handlePersistDataException(StorageFileNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(new HashMap<>(
                new HashMap<>() {{
                    put("timestamp", LocalDateTime.now());
                    put("status", HttpStatus.BAD_REQUEST.value());
                    put("error", "File Not Found");
                    put("message", ex.getMessage());
                }}
        ));
    }

}
