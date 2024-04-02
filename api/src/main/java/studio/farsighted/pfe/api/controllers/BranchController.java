package studio.farsighted.pfe.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import studio.farsighted.pfe.api.models.Branch;
import studio.farsighted.pfe.api.services.BranchService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/branches")
public class BranchController {
    @Autowired
    private BranchService branchService;

    @GetMapping("/")
    public List<Branch> getAllBranches() {
        return branchService.getAllBranches();
    }

    @GetMapping("/{id}")
    public Optional<Branch> getBranchById(@PathVariable String id) {
        return branchService.getBranchById(id);
    }

    @PostMapping("/")
    public Branch saveBranch(@RequestBody Branch branch) {
        return branchService.saveBranch(branch);
    }

    @DeleteMapping("/{id}")
    public void deleteBranch(@PathVariable String id) {
        branchService.deleteBranch(id);
    }
}
