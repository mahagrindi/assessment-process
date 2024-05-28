package studio.farsighted.pfe.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studio.farsighted.pfe.api.exceptions.PersistDataException;
import studio.farsighted.pfe.api.interfaces.AxeSubInterface;
import studio.farsighted.pfe.api.models.AxeEntity;
import studio.farsighted.pfe.api.models.AxeSubEntity;
import studio.farsighted.pfe.api.repositories.AxeRepository;
import studio.farsighted.pfe.api.repositories.AxeSubRepository;

import java.util.List;
import java.util.UUID;

@Service
public class AxeSubService implements AxeSubInterface {

    @Autowired
    private AxeSubRepository axeSubRepository;

    @Autowired
    private AxeRepository axeRepository;

    @Override
    public List<AxeSubEntity> findAll() {
        return axeSubRepository.findAll();
    }

    @Override
    public AxeSubEntity findById(UUID id) {
        return axeSubRepository.findById(id).orElseThrow(() -> new PersistDataException("Axe Sub not found"));
    }

    @Override
    public AxeSubEntity save(UUID id, AxeSubEntity axeSubEntity) {
        AxeEntity axe = axeRepository.findById(id).orElseThrow(() -> new PersistDataException("Axe not found"));
        axeSubEntity.setAxe(axe);
        return axeSubRepository.save(axeSubEntity);
    }

    @Override
    public AxeSubEntity update(AxeSubEntity axeSubEntity) {
        return axeSubRepository.save(axeSubEntity);
    }

    @Override
    public void deleteById(UUID id) {
        axeSubRepository.deleteById(id);
    }

    @Override
    public Boolean isExist(UUID id) {
        return axeSubRepository.existsById(id);
    }
}
