package studio.farsighted.pfe.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studio.farsighted.pfe.api.exceptions.EntityNotFoundException;
import studio.farsighted.pfe.api.models.AxeEntity;
import studio.farsighted.pfe.api.models.Criteria;
import studio.farsighted.pfe.api.models.SubAxeEntity;
import studio.farsighted.pfe.api.repositories.SubAxeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SubAxeService {
	@Autowired
	private SubAxeRepository subaxeRepository;

	public SubAxeEntity updateSubAxe(SubAxeEntity subaxe) {


		SubAxeEntity SubAxseDB = subaxeRepository.findById(subaxe.getId()).orElse(null);
		SubAxseDB.setSubaxe_name(subaxe.getSubaxe_name());
		SubAxseDB.setVisibility(subaxe.isVisibility());

		return subaxeRepository.save(SubAxseDB);
	}



	public SubAxeEntity subAxeById(String id) {
		// Logic to get SubAxeEntity by id
		return subaxeRepository.findById(id).orElse(null);
	}



	public Boolean isExist(String id) {
		return subaxeRepository.existsById(id);
	}

	public SubAxeEntity updatesubAxeVisibility(String id ) {

		SubAxeEntity SubAxseDB = subaxeRepository.findById(id).orElse(null);


		SubAxseDB.setVisibility(!SubAxseDB.isVisibility());
		return subaxeRepository.save(SubAxseDB);
	}



	public SubAxeEntity addCriteria(String subaxeId, Criteria criteriaEntity) {
		SubAxeEntity SubAxseDB = subaxeRepository.findById(subaxeId)
				.orElseThrow(() -> new EntityNotFoundException("sub-Axe not found with ID: " + subaxeId));



		List<Criteria> cretiesList = SubAxseDB.getCriteriaList(); // Get the list of sub-axes
		cretiesList.add(criteriaEntity); // Add the new sub-axe to the list



		// Now set the updated list back to the axe
		SubAxseDB.setCriteriaList(cretiesList);

		// Save the updated axe
		return subaxeRepository.save(SubAxseDB);
	}



}
