package com.amoGroup.amoGroup.controller;

import com.amoGroup.amoGroup.entities.Company;
import com.amoGroup.amoGroup.entities.CompanyCard;
import com.amoGroup.amoGroup.patch.Patcher;
import com.amoGroup.amoGroup.repositories.CompanyRepository;
import com.amoGroup.amoGroup.response.CompanyResponse;
import com.amoGroup.amoGroup.response.MessageResponse;
import com.amoGroup.amoGroup.services.company.CompanyService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired
    CompanyService companyService;

    @Autowired
    CompanyRepository repository;

    @Autowired
    Patcher patcher;

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PostMapping("/create")
    public ResponseEntity<Company> create(@Valid @RequestBody Company request) {
        try {
            Company company = companyService.add(request);
            return ResponseEntity.ok(company);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PostMapping("/update")
    public ResponseEntity<Company> update(@Valid @RequestBody Company request) {
        try {
            Company company = companyService.update(request);
            return ResponseEntity.ok(company);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<Company> patch(@PathVariable String id, @RequestBody Company patch) {
        try {
            Company company = repository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Company not found with given id"));
            patcher.patcher(company, patch);
            return ResponseEntity.ok(companyService.update(company));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @GetMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        try {
            boolean result = companyService.delete(id);
            if (result) {
                return ResponseEntity.ok(
                        new MessageResponse(HttpStatus.OK, "Company deleted successfully")
                );
            } else {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .build();
            }
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<CompanyResponse> get(@RequestHeader(value = "Accept-Language", defaultValue = "az") String language, @PathVariable String id) {
        try {
            CompanyResponse company = companyService.getCompany(id, language)
                    .orElseThrow(() -> new RuntimeException("Company not found with given id"));
            return ResponseEntity.ok(company);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @GetMapping("/getWithTranslation/{id}")
    public ResponseEntity<Company> getAll(@PathVariable String id) {
        try {
            Company company = companyService.getCompanyWithTranslations(id)
                    .orElseThrow(() -> new RuntimeException("Company not found with given id"));
            return ResponseEntity.ok(company);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @GetMapping("/getAllByName/{name}")
    public ResponseEntity<Company> getAllCompanyByName(@PathVariable String name) {
        try {
            Company company = companyService.getCompanyByName(name)
                    .orElseThrow(() -> new RuntimeException("Company not found with given name"));
            return ResponseEntity.ok(company);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @GetMapping("/getByName/{name}")
    public ResponseEntity<CompanyResponse> getCompanyByName(@RequestHeader(value = "Accept-Language", defaultValue = "az") String language, @PathVariable String name) {
        try {
            CompanyResponse company = companyService.getCompanyByName(name, language)
                    .orElseThrow(() -> new RuntimeException("Company not found with given name"));
            return ResponseEntity.ok(company);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<CompanyResponse>> list(@RequestHeader(value = "Accept-Language", defaultValue = "az") String language) {
        try {
            return ResponseEntity.ok(companyService.getCompanies(language));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @GetMapping("/listAll")
    public ResponseEntity<List<Company>> listAll() {
        try {
            return ResponseEntity.ok(companyService.getAllCompanies());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        try {
            return ResponseEntity.ok(companyService.count());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PostMapping("/addCard/{companyId}")
    public ResponseEntity<Company> addCard(@Valid @RequestBody CompanyCard card, @PathVariable String companyId) {
        try {
            Company company = companyService.addCard(companyId, card);
            return ResponseEntity.ok(company);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @GetMapping("deleteCard/{companyId}/{cardId}")
    public ResponseEntity<?> deleteCategory(@PathVariable String companyId, @PathVariable String cardId) {
        try {
            Company company = companyService.deleteCard(companyId, cardId);
            return ResponseEntity.ok(company);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }
}
