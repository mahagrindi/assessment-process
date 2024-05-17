package studio.farsighted.pfe.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import studio.farsighted.pfe.api.exceptions.PaginationBoundException;
import studio.farsighted.pfe.api.exceptions.PersistDataException;
import studio.farsighted.pfe.api.models.AxeEntity;
import studio.farsighted.pfe.api.models.ProgramCohortEntity;
import studio.farsighted.pfe.api.models.SubAxeEntity;
import studio.farsighted.pfe.api.services.AxeService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/axes")
@CrossOrigin(origins = "http://localhost:1999", allowCredentials = "true", allowedHeaders = "*")

public class AxeController {

    @Autowired
    private AxeService axeService;


/* API GEt to fetsh the list of axess with pagenation*/
    @GetMapping(value = "", params = {"axe_name", "visibility"})
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Page<AxeEntity>> index(@RequestParam(value = "axe_name", required = false) String axe_name,
                                                 @RequestParam(value = "visibility", required = false) Boolean visibility,
                                                 @PageableDefault(size = 10, page = 0, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            return ResponseEntity.ok(axeService.get(axe_name, visibility, pageable));
        } catch (Exception e) {
            throw new PaginationBoundException("Axes not found: " + e.getMessage());
        }
    }

/* API to fetsh list axe */
@GetMapping("/")
@PreAuthorize("hasAnyAuthority('ADMIN')")
public List<AxeEntity> getAllAxes() {
    return axeService.fetchAxeList();
}

/* API GET By ID */
@GetMapping("/{id}")
@PreAuthorize("hasAnyAuthority('ADMIN')")
public AxeEntity getAxeById(@PathVariable String id) {
        return axeService.axeById(id);
}


/* API PUT to Update Axe */
@PutMapping("/")
@PreAuthorize("hasAnyAuthority('ADMIN')")
public AxeEntity update(@RequestBody AxeEntity axe) {
        if (!axeService.isExist(axe.getId())) {
            throw new PersistDataException("axe with id: " + axe.getId() + " not found");
        }
        return axeService.updateAxe(axe);
    }

/* API UpDate visibility of axe */
@PutMapping("/{id}")
@PreAuthorize("hasAnyAuthority('ADMIN')")
public AxeEntity updateVisibility(@PathVariable String id) {
    if (!axeService.isExist(id)) {
        throw new PersistDataException("axe with id: " + id + " not found");
    }
    return axeService.updateAxeVisibility(id);
}

/* API Post Creat axe */
@PostMapping
@PreAuthorize("hasAnyAuthority('ADMIN')")
public ResponseEntity<AxeEntity> save(@RequestBody AxeEntity axe) {
    try {
        return ResponseEntity.ok(axeService.saveAxe(axe) );
    } catch (Exception e) {
        throw new PersistDataException("formEvaluation not saved: " + e.getMessage());
    }
}

/* API Post to add sub-axe to an axe */
@PostMapping(value = "/subaxes", params = {"axeId"})
@PreAuthorize("hasAnyAuthority('ADMIN')")
public ResponseEntity<AxeEntity> save(@RequestParam(value = "axeId") String id, @RequestBody SubAxeEntity subAxe) {
    try {
        return ResponseEntity.ok(axeService.addSubAxe(id, subAxe));
    } catch (Exception e) {
        throw new PersistDataException("Program Cohort not saved: " + e.getMessage());
    }
}




@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteAxe(@PathVariable String id) {
    return  axeService.deleteAxeById(id);

}

  @PutMapping("/add-branch")
  @PreAuthorize("hasAnyAuthority('ADMN')")

    public AxeEntity addBranchToAxe(@PathVariable String axeId, @RequestBody SubAxeEntity subAxeEntity) {
        return axeService.addSubAxe(axeId , subAxeEntity) ;
    }

}