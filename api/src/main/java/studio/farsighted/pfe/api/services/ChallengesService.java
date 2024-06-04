package studio.farsighted.pfe.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studio.farsighted.pfe.api.models.Challenge;
import studio.farsighted.pfe.api.repositories.ChallengesRepository;

import java.util.List;

@Service
public class ChallengesService {
	@Autowired
	private ChallengesRepository challengesRepository;



	public List<Challenge> getAll() {
		return challengesRepository.findAll() ;
	}






}
