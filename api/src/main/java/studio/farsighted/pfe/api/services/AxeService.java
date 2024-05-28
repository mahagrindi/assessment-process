package studio.farsighted.pfe.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import studio.farsighted.pfe.api.interfaces.AxeInterface;
import studio.farsighted.pfe.api.models.AxeEntity;
import studio.farsighted.pfe.api.repositories.AxeRepository;

import java.util.UUID;

@Service
public class AxeService implements AxeInterface {

    @Autowired
    private AxeRepository axeRepository;

    @Override
    public Page<AxeEntity> get(String query, Boolean status, Pageable pageable) {
        return axeRepository.filterByCriteria(query, status, pageable);
    }

    @Override
    public AxeEntity findById(UUID id) {
        return axeRepository.findById(id).get();
    }

    @Override
    public AxeEntity save(AxeEntity axeEntity) {
        return axeRepository.save(axeEntity);
    }

    @Override
    public AxeEntity update(AxeEntity axeEntity) {
        return axeRepository.save(axeEntity);
    }

    @Override
    public void delete(UUID id) {
        axeRepository.deleteById(id);
    }

    @Override
    public boolean isExist(UUID id) {
        return axeRepository.existsById(id);
    }
}
