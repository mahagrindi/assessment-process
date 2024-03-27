package studio.farsighted.pfe.api.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import studio.farsighted.pfe.api.models.Startup;

public interface StartupInterface {

    Page<Startup> getAll(Pageable pageable);
    Page<Startup> getBySector(String queryName, Pageable pageable);

    Startup find(String id);
    Startup save(Startup startup);
    Startup update(Startup startup);

    void delete(String id);

    Boolean transformToDatabase();
    Boolean isExist(String id);

}