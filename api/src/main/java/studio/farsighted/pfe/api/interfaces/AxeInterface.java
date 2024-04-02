package studio.farsighted.pfe.api.interfaces;

import org.springframework.http.ResponseEntity;

import studio.farsighted.pfe.api.models.Axe;

import java.util.List;

// Class
public interface AxeInterface {

    // Save operation
    Axe saveAxe (Axe axe);

    // Read operation
    List<Axe> fetchAxeList();

    // Update operation
    Axe updateAxe(Axe axe,
                  String axeId);

    // Delete operation
    ResponseEntity<Void> deleteAxeById(String axeId);
}
