package com.amoGroup.amoGroup.controller;


import com.amoGroup.amoGroup.entities.CompanyCard;
import com.amoGroup.amoGroup.patch.Patcher;
import com.amoGroup.amoGroup.repositories.CompanyCardRepository;
import com.amoGroup.amoGroup.response.CompanyCardResponse;
import com.amoGroup.amoGroup.response.MessageResponse;
import com.amoGroup.amoGroup.services.companyCard.CompanyCardService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@RequestMapping("/api/companyCard")
public class CompanyCardController {

    @Autowired
    CompanyCardService companyCardService;

    @Autowired
    CompanyCardRepository repository;

    @Autowired
    Patcher patcher;

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PostMapping("/create")
    public ResponseEntity<CompanyCard> create(@Valid @RequestBody CompanyCard request) {
        try {
            CompanyCard companyCard = companyCardService.add(request);
            return ResponseEntity.ok(companyCard);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PostMapping("/update")
    public ResponseEntity<CompanyCard> update(@Valid @RequestBody CompanyCard request) {
        try {
            CompanyCard companyCard = companyCardService.update(request);
            return ResponseEntity.ok(companyCard);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<CompanyCard> patch(@PathVariable String id, @RequestBody CompanyCard patch) {
        try {
            CompanyCard companyCard = repository.findById(id)
                    .orElseThrow(() -> new RuntimeException("CompanyCard not found with given id"));
            patcher.patcher(companyCard, patch);
            return ResponseEntity.ok(companyCardService.update(companyCard));
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
            boolean result = companyCardService.delete(id);
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
    public ResponseEntity<CompanyCardResponse> get(@RequestHeader(value = "Accept-Language", defaultValue = "az") String language, @PathVariable String id) {
        try {
            CompanyCardResponse companyCard = companyCardService.getCompanyCard(id, language)
                    .orElseThrow(() -> new RuntimeException("CompanyCard not found with given id"));
            return ResponseEntity.ok(companyCard);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @GetMapping("/getWithTranslation/{id}")
    public ResponseEntity<?> getAll(@PathVariable String id) {
        try {
            return ResponseEntity.ok(companyCardService.getCompanyCardWithTranslations(id));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> list(@RequestHeader(value = "Accept-Language", defaultValue = "az") String language) {
        try {
            return ResponseEntity.ok(companyCardService.getCompanyCards(language));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @GetMapping("/listAll")
    public ResponseEntity<?> listAll() {
        try {
            return ResponseEntity.ok(companyCardService.getAllCompanyCards());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @GetMapping("/count")
    public ResponseEntity<?> getCount() {
        try {
            return ResponseEntity.ok(companyCardService.count());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }


}
