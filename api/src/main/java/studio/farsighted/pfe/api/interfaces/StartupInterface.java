package studio.farsighted.pfe.api.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import studio.farsighted.pfe.api.models.StartupEntity;

public interface StartupInterface {
    Page<StartupEntity> getAll(Pageable pageable);

    Page<StartupEntity> getBySector(String queryName, Pageable pageable);

    StartupEntity find(String id);

    StartupEntity save(StartupEntity startupEntity);

    StartupEntity update(StartupEntity startupEntity);

    void delete(String id);

    Boolean transformToDatabase();

    Boolean isExist(String id);
}