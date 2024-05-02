package studio.farsighted.pfe.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import studio.farsighted.pfe.api.models.ProgramEntity;

import java.util.UUID;

public interface ProgramRepository extends JpaRepository<ProgramEntity, UUID> {

    @Query("SELECT program FROM ProgramEntity program WHERE " +
            "(:query IS NULL OR :query = '' OR LOWER(program.programName) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(program.programDescription) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(program.provider.programClientName) LIKE LOWER(CONCAT('%', :query, '%'))) " +
            "AND (:status IS NULL OR :status= '' OR program.programStatus = :status) " +
            "AND (:industry IS NULL OR :industry = '' OR program.programIndustry = :industry)")
    Page<ProgramEntity> findProgramsByFilterCriteria(@Param("query") String query, @Param("status") String status, @Param("industry") String industry, Pageable pageable);

}
