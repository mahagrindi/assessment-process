package studio.farsighted.pfe.api.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import studio.farsighted.pfe.api.models.AxeEntity;

import java.util.UUID;

public interface AxeInterface {
    Page<AxeEntity> get(String query, Boolean status, Pageable pageable);

    AxeEntity findById(UUID id);

    AxeEntity save(AxeEntity axeEntity);

    AxeEntity update(AxeEntity axeEntity);

    void delete(UUID id);

    boolean isExist(UUID id);
}
