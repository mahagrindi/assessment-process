package studio.farsighted.pfe.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import studio.farsighted.pfe.api.models.Branch;

import java.util.Optional;

public interface BranchRepository  extends JpaRepository<Branch, String>  {
}
