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


    public Optional<Criteria> getCriteriaById(String id) {
        return criteriaRepository.findById(id);
    }



    public Boolean isExist(String id) {
        return criteriaRepository.existsById(id);
    }


    public Criteria updateVisibility(String id ) {

        Criteria CriteriaDB = criteriaRepository.findById(id).orElse(null);


        CriteriaDB.setVisibility(!CriteriaDB.isVisibility());
        return criteriaRepository.save(CriteriaDB);
    }


    public Criteria update(Criteria criteria) {


        Criteria CriteriaDB = criteriaRepository.findById(criteria.getId()).orElse(null);
        CriteriaDB.setCriterionName(criteria.getCriterionName());
        CriteriaDB.setVisibility(criteria.isVisibility());

        return criteriaRepository.save(CriteriaDB);
    }
}
