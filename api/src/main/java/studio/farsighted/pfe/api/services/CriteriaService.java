package studio.farsighted.pfe.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import studio.farsighted.pfe.api.models.Criteria;
import studio.farsighted.pfe.api.repositories.CriteriaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CriteriaService {
    @Autowired
    private CriteriaRepository criteriaRepository;

    public Criteria saveCriteria(Criteria criteria) {
        return criteriaRepository.save(criteria);
    }

    public List<Criteria> getAllCriteria() {
        return criteriaRepository.findAll();
    }

    public Optional<Criteria> getCriteriaById(String id) {
        return criteriaRepository.findById(id);
    }

    public void deleteCriteria(String id) {
        criteriaRepository.deleteById(id);
    }
}
