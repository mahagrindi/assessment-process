package studio.farsighted.pfe.api.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import studio.farsighted.pfe.api.models.StartupEntity;

import java.util.List;
import java.util.UUID;

public interface StartupInterface {

    List<StartupEntity> getAll();

    Page<StartupEntity> get(String query, String sector, Pageable pageable);

    StartupEntity find(UUID id);

    StartupEntity save(StartupEntity startupEntity);

    StartupEntity update(StartupEntity startupEntity);

    void delete(UUID id);


    Integer transformToDatabase();

    Boolean isExist(UUID id);

    List<String> getDistinctSector();
}