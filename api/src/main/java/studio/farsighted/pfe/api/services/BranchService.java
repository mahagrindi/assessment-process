package studio.farsighted.pfe.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studio.farsighted.pfe.api.models.Branch;
import studio.farsighted.pfe.api.repositories.BranchRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BranchService {
	@Autowired
	private BranchRepository branchRepository;

	public List<Branch> getAllBranches() {
		return branchRepository.findAll();
	}

	public Optional<Branch> getBranchById(String id) {
		return branchRepository.findById(id);
	}

	public Branch saveBranch(Branch branch) {
		return branchRepository.save(branch);
	}

	public void deleteBranch(String id) {
		branchRepository.deleteById(id);
	}
}
