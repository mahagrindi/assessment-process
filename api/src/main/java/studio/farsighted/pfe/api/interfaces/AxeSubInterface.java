package studio.farsighted.pfe.api.interfaces;

import studio.farsighted.pfe.api.models.AxeSubEntity;

import java.util.List;
import java.util.UUID;

public interface AxeSubInterface {
    List<AxeSubEntity> findAll();

    AxeSubEntity findById(UUID id);

    AxeSubEntity save(UUID id, AxeSubEntity axeSubEntity);

    AxeSubEntity update(AxeSubEntity axeSubEntity);

    void deleteById(UUID id);

    Boolean isExist(UUID id);
}
