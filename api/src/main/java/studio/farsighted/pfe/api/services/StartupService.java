package studio.farsighted.pfe.api.services;

import jakarta.persistence.PersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studio.farsighted.pfe.api.components.CsvParser;
import studio.farsighted.pfe.api.entities.Startup;
import studio.farsighted.pfe.api.interfaces.StartupInterface;
import studio.farsighted.pfe.api.repositories.StartupRepository;

import java.io.IOException;
import java.util.List;

@Service
public class StartupService implements StartupInterface {

    @Autowired
    private StartupRepository startupRepository;
    @Autowired
    private CsvParser csvParser;

    @Override
    public List<Startup> index() throws PersistenceException {
        return startupRepository.findAll();
    }

    @Override
    public Startup find(String id) {
        return startupRepository.findById(id).get();
    }

    @Override
    public Startup save(Startup startup) throws PersistenceException {
        return startupRepository.save(startup);
    }

    @Override
    public Startup update(Startup startup) throws PersistenceException {
        return startupRepository.save(startup);
    }

    @Override
    public void delete(String id) throws PersistenceException {
        startupRepository.deleteById(id);
    }

    @Override
    public Boolean transformToDatabase() throws PersistenceException {
        try {
            List<Startup> startups = csvParser.parse("D:\\Repositories\\web work\\design-develop-assessment-process\\DB\\sheets\\startups.csv", Startup.class);
            startupRepository.saveAll(startups);
            return true;
        } catch (IOException e) {
            throw new PersistenceException("Error parsing CSV file: " + e.getMessage(), e);
        }
    }

    @Override
    public Boolean isExist(String id) {
        return startupRepository.existsById(id);
    }
}