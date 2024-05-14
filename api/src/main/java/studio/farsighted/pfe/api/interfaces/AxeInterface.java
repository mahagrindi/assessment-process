package studio.farsighted.pfe.api.interfaces;

import org.springframework.http.ResponseEntity;

import studio.farsighted.pfe.api.models.AxeEntity;

import java.util.List;

// Class
public interface AxeInterface {

    // Save operation
    AxeEntity saveAxe (AxeEntity axe);

    // Read operation
    List<AxeEntity> fetchAxeList();

    // Update operation
    AxeEntity updateAxe(AxeEntity axe,
                        String axeId);

    // Delete operation
    ResponseEntity<Void> deleteAxeById(String axeId);
}
