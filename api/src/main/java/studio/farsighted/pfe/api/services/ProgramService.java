package studio.farsighted.pfe.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import studio.farsighted.pfe.api.interfaces.ProgramInterface;
import studio.farsighted.pfe.api.models.ProgramEntity;
import studio.farsighted.pfe.api.repositories.ProgramProviderRepository;
import studio.farsighted.pfe.api.repositories.ProgramRepository;

import java.util.List;
import java.util.UUID;

@Service
public class ProgramService implements ProgramInterface {

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private ProgramProviderRepository programProviderRepository;

    @Override
    public Page<ProgramEntity> get(String query, String status, Pageable pageable) {
        return programRepository.findProgramsByFilterCriteria(query, status, pageable);
    }

    @Override
    public ProgramEntity find(UUID id) {
        return programRepository.findById(id).get();
    }

    @Override
    public ProgramEntity save(ProgramEntity program) {
        if (program.getProvider() != null) {
            program.setProvider(programProviderRepository.save(program.getProvider()));
        }
        return programRepository.save(program);
    }

    @Override
    public ProgramEntity update(ProgramEntity program) {
        if (program.getProvider() != null) {
            program.setProvider(programProviderRepository.save(program.getProvider()));
        }
        return programRepository.save(program);
    }

    @Override
    public void delete(UUID id) {
        programRepository.deleteById(id);
    }

    @Override
    public Boolean isExist(UUID id) {
        return programRepository.existsById(id);
    }

    @Override
    public List<ProgramEntity> getList() {
        return programRepository.findAll();
    }
}
