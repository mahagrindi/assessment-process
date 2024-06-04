package studio.farsighted.pfe.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import studio.farsighted.pfe.api.models.AxeEntity;
import studio.farsighted.pfe.api.models.Challenge;

public interface ChallengesRepository extends JpaRepository<Challenge, Long> {


}
