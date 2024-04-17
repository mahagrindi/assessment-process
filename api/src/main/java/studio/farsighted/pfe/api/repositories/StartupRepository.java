package studio.farsighted.pfe.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import studio.farsighted.pfe.api.models.StartupEntity;

import java.util.List;
import java.util.UUID;

public interface StartupRepository extends JpaRepository<StartupEntity, UUID> {

    @Query("SELECT DISTINCT startupActivitySector FROM StartupEntity")
    List<String> findDistinctStartupActivitySector();

    //@Query("SELECT startup FROM StartupEntity startup WHERE (LOWER(startup.startupName) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(startup.startupDescription) LIKE LOWER(CONCAT('%', :query, '%'))) OR (:sector IS NULL OR startup.startupActivitySector = :sector)")
    @Query("SELECT startup FROM StartupEntity startup WHERE (:query IS NULL OR :query = '' OR (LOWER(startup.startupName) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(startup.startupDescription) LIKE LOWER(CONCAT('%', :query, '%')))) AND (:sector IS NULL OR :sector = '' OR startup.startupActivitySector = :sector)")
    Page<StartupEntity> findByStartupNameOrDescriptionAndSector(@Param("query") String query, @Param("sector") String sector, Pageable pageable);

}
