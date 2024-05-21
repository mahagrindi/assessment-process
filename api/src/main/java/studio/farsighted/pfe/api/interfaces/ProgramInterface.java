package studio.farsighted.pfe.api.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import studio.farsighted.pfe.api.models.ProgramEntity;

import java.util.List;
import java.util.UUID;

public interface ProgramInterface {
    Page<ProgramEntity> get(String query, String status, Pageable pageable);

    ProgramEntity find(UUID id);

    ProgramEntity save(ProgramEntity program);

    ProgramEntity update(ProgramEntity program);

    void delete(UUID id);

    Boolean isExist(UUID id);

    List<ProgramEntity> getList();

}
