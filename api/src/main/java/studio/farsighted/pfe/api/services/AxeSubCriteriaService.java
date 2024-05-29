package studio.farsighted.pfe.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import studio.farsighted.pfe.api.interfaces.AxeSubCriteriaInterface;
import studio.farsighted.pfe.api.models.AxeSubCriteriaEntity;
import studio.farsighted.pfe.api.models.AxeSubEntity;
import studio.farsighted.pfe.api.repositories.AxeSubCriteriaRepository;
import studio.farsighted.pfe.api.repositories.AxeSubRepository;

import java.util.UUID;

@Service
public class AxeSubCriteriaService implements AxeSubCriteriaInterface {

    @Autowired
    private AxeSubCriteriaRepository axeSubCriteriaRepository;

    @Autowired
    private AxeSubRepository axeSubRepository;

    @Override
    public Page<AxeSubCriteriaEntity> get(String name, String query, Boolean status, Pageable pageable) {
        return axeSubCriteriaRepository.filterBasedOnCriteria(name, query, status, pageable);
    }

    @Override
    public AxeSubCriteriaEntity save(UUID id, AxeSubCriteriaEntity axeSubCriteriaEntity) {
        AxeSubEntity axeSubEntity = axeSubRepository.findById(id).orElseThrow(() -> new RuntimeException("Axe Sub not found"));
        axeSubCriteriaEntity.setAxeSub(axeSubEntity);
        return axeSubCriteriaRepository.save(axeSubCriteriaEntity);
    }

    @Override
    public AxeSubCriteriaEntity update(AxeSubCriteriaEntity axeSubCriteriaEntity) {
        AxeSubCriteriaEntity entity = axeSubCriteriaRepository.findById(axeSubCriteriaEntity.getId()).orElseThrow(() -> new RuntimeException("Axe Sub Criteria not found"));
        axeSubCriteriaEntity.setAxeSub(entity.getAxeSub());
        return axeSubCriteriaRepository.save(axeSubCriteriaEntity);
    }

    @Override
    public AxeSubCriteriaEntity find(UUID id) {
        return axeSubCriteriaRepository.findById(id).get();
    }

    @Override
    public void delete(UUID id) {
        axeSubCriteriaRepository.deleteById(id);
    }

    @Override
    public Boolean existsById(UUID id) {
        return axeSubCriteriaRepository.existsById(id);
    }
}
