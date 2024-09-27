package com.amoGroup.amoGroup.controller;

import com.amoGroup.amoGroup.entities.Language;
import com.amoGroup.amoGroup.patch.Patcher;
import com.amoGroup.amoGroup.repositories.LanguageRepository;
import com.amoGroup.amoGroup.response.MessageResponse;
import com.amoGroup.amoGroup.services.language.LanguageService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@RequestMapping("/api/language")
public class LanguageController {

    @Autowired
    private LanguageService languageService;

    @Autowired
    LanguageRepository repository;

    @Autowired
    Patcher patcher;

    @PostConstruct
    void init() {
        if (languageService.getLanguages().isEmpty()) {
            languageService.addLanguage(Language.builder()
                    .code("az")
                    .name("Azərbaycan dili")
                    .build());
            languageService.addLanguage(Language.builder()
                    .code("en")
                    .name("English")
                    .build());
            languageService.addLanguage(Language.builder()
                    .code("ru")
                    .name("Russian")
                    .build());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PostMapping("/create")
    public ResponseEntity<?> addLanguage(@Valid @RequestBody Language request) {
        try {
            Language u = languageService.addLanguage(request);
            return ResponseEntity.ok(u);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PostMapping("/update")
    public ResponseEntity<?> updateLanguage(@Valid @RequestBody Language request) {
        try {
            Language language = languageService.updateLanguage(request);
            return ResponseEntity.ok(language);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<?> patchUpdate(@PathVariable String id, @RequestBody Language request) throws IllegalAccessException {
        try {
            Language existing = repository.findById(id)
                    .orElseThrow(() -> new RuntimeException("There is no contact info with given id"));
            patcher.patcher(existing, request);

            return ResponseEntity.ok(repository.save(existing));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @GetMapping("/delete/{id}")
    public ResponseEntity<?> deleteLanguage(@Valid @PathVariable String id) {
        try {
            boolean result = languageService.deleteLanguage(id);
            if (result) {
                return ResponseEntity.ok(new MessageResponse(HttpStatus.OK, "Language entity is deleted successfully"));
            } else {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(new MessageResponse(HttpStatus.BAD_REQUEST, "Language entity is not deleted"));
            }
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> getLanguages() {
        try {
            return ResponseEntity.ok(languageService.getLanguages());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getLanguage(@PathVariable String id) {
        try {
            return ResponseEntity.ok(languageService.getLanguage(id));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @GetMapping("/count")
    public ResponseEntity<?> countLanguages() {
        try {
            return ResponseEntity.ok(languageService.count());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

}
