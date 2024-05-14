package studio.farsighted.pfe.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import studio.farsighted.pfe.api.models.AxeEntity;
import studio.farsighted.pfe.api.models.Branch;
import studio.farsighted.pfe.api.exceptions.EntityNotFoundException;
import studio.farsighted.pfe.api.interfaces.AxeInterface;
import studio.farsighted.pfe.api.repositories.AxeRepository;
import studio.farsighted.pfe.api.repositories.BranchRepository;

import java.util.List;
import java.util.Optional;

// Annotation
@Service
public class AxeService	implements AxeInterface {

	@Autowired
	private AxeRepository axeRepository;
	@Autowired
	private BranchRepository branchRepository;
	// Save operation
	@Override
	public AxeEntity saveAxe (AxeEntity axe)
	{
		return axeRepository.save(axe);
	}

	@Override
	public List<AxeEntity> fetchAxeList() {
		return axeRepository.findAll() ;
	}


	public Page<AxeEntity> get(String axe_name, Boolean visibility, @PageableDefault(size = 10, page = 0, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
		return axeRepository.findAxeByFilter(axe_name, visibility, pageable);
	}



	public AxeEntity axeById(String axeId) {
		Optional<AxeEntity> optionalAxe = axeRepository.findById(axeId);
		return optionalAxe.orElse(null); // Return null if not found, you can handle this differently based on your needs
	}

	@Override
	public AxeEntity updateAxe(AxeEntity axe, String axeId) {
		AxeEntity AxseDB = axeRepository.findById(axeId).orElse(null);

		AxseDB.setNote(axe.getNote());
		AxseDB.setVisibility(axe.isVisibility());
		AxseDB.setAxe_name(axe.getAxe_name());
		return axeRepository.save(AxseDB);
	}

	@Override
	public ResponseEntity<Void> deleteAxeById(String axeId) {

		Optional<AxeEntity> axeOptional = axeRepository.findById(axeId);
		if (axeOptional.isPresent()) {
			axeRepository.deleteById(axeId);
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}

	// Read operation

	public List<AxeEntity> fetchCohortList()
	{
		return (List<AxeEntity>)
				axeRepository.findAll();
	}



	public Branch addBranchToAxe(String axeId, Branch branch) {
		AxeEntity axe = axeRepository.findById(axeId)
				.orElseThrow(() -> new EntityNotFoundException("Axe not found with ID: " + axeId));

		branch.setAxe(axe);
	//	axe.getSubAxes.add(branch);

		return branchRepository.save(branch);
	}

}
