package studio.farsighted.pfe.api.interfaces;

import studio.farsighted.pfe.api.entities.Startup;

import java.util.List;

public interface StartupInterface {

    List<Startup> index();
    Startup find(String id);
    Startup save(Startup startup);
    Startup update(Startup startup);
    void delete(String id);
    Boolean transformToDatabase();
    Boolean isExist(String id);

}