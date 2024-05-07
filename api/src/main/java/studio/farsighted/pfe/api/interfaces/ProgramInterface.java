package studio.farsighted.pfe.api.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import studio.farsighted.pfe.api.models.ProgramEntity;

import java.util.UUID;

public interface ProgramInterface {
    Page<ProgramEntity> get(String query, String status, String industry, Pageable pageable);

    ProgramEntity find(UUID id);

    ProgramEntity save(ProgramEntity program);

    ProgramEntity update(ProgramEntity program);

    void delete(String id);

    Boolean isExist(UUID id);
}
