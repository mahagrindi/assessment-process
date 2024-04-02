package studio.farsighted.pfe.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import studio.farsighted.pfe.api.models.Axe;
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
	public Axe saveAxe (Axe axe)
	{
		return axeRepository.save(axe);
	}

	@Override
	public List<Axe> fetchAxeList() {
		return axeRepository.findAll() ;
	}

	public Axe axeById(String axeId) {
		Optional<Axe> optionalAxe = axeRepository.findById(axeId);
		return optionalAxe.orElse(null); // Return null if not found, you can handle this differently based on your needs
	}

	@Override
	public Axe updateAxe(Axe axe, String axeId) {
		Axe AxseDB = axeRepository.findById(axeId).orElse(null);

		AxseDB.setNote(axe.getNote());
		AxseDB.setVisibility(axe.isVisibility());
		AxseDB.setAxe_name(axe.getAxe_name());
		return axeRepository.save(AxseDB);
	}

	@Override
	public ResponseEntity<Void> deleteAxeById(String axeId) {

		Optional<Axe> axeOptional = axeRepository.findById(axeId);
		if (axeOptional.isPresent()) {
			axeRepository.deleteById(axeId);
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}

	// Read operation

	public List<Axe> fetchCohortList()
	{
		return (List<Axe>)
				axeRepository.findAll();
	}



	public Branch addBranchToAxe(String axeId, Branch branch) {
		Axe axe = axeRepository.findById(axeId)
				.orElseThrow(() -> new EntityNotFoundException("Axe not found with ID: " + axeId));

		branch.setAxe(axe);
		axe.getBranches().add(branch);

		return branchRepository.save(branch);
	}

}
