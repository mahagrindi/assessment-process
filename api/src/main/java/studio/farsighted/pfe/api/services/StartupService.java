package studio.farsighted.pfe.api.services;

import jakarta.persistence.PersistenceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import studio.farsighted.pfe.api.components.CsvParser;
import studio.farsighted.pfe.api.interfaces.StartupInterface;
import studio.farsighted.pfe.api.models.StartupEntity;
import studio.farsighted.pfe.api.repositories.StartupRepository;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class StartupService implements StartupInterface {
    private static final Logger LOGGER = LoggerFactory.getLogger(StartupService.class);

    @Autowired
    private StartupRepository startupRepository;
    @Autowired
    private CsvParser csvParser;

    @Override
    public List<StartupEntity> getAll() {
        return startupRepository.findAll();
    }

    @Override
    public Page<StartupEntity> get(String query, String sector, Pageable pageable) {
        return startupRepository.findByStartupNameOrDescriptionAndSector(query, sector, pageable);
    }

    @Override
    public StartupEntity find(UUID id) {
        return startupRepository.findById(id).get();
    }

    @Override
    public StartupEntity save(StartupEntity startupEntity) {
        return startupRepository.save(startupEntity);
    }

    @Override
    public StartupEntity update(StartupEntity startupEntity) {
        return startupRepository.save(startupEntity);
    }

    @Override
    public void delete(UUID id) {
        startupRepository.deleteById(id);
    }

    @Override
    public Integer transformToDatabase() {
        try {
            AtomicInteger count = new AtomicInteger(0);
            List<StartupEntity> startupEntities = csvParser.parse("D:\\Repositories\\web work\\design-develop-assessment-process\\DB\\sheets\\startups.csv", StartupEntity.class);
//            startupRepository.saveAll(startupEntities);
            startupEntities.parallelStream().forEach(startup -> {
                try {
                    startupRepository.save(startup);
                    count.incrementAndGet();
                } catch (DataIntegrityViolationException e) {
                    LOGGER.warn("Duplicate startup found: {}", startup.getStartupName());
                }
            });
            return count.get();
        } catch (IOException e) {
            throw new PersistenceException("Error parsing CSV file: " + e.getMessage(), e);
        }
    }

    @Override
    public Boolean isExist(UUID id) {
        return startupRepository.existsById(id);
    }

    @Override
    public List<String> getDistinctSector() {
        return startupRepository.findDistinctStartupActivitySector();
    }

}