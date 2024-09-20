package com.amoGroup.amoGroup.controller;

import com.amoGroup.amoGroup.entities.ContactUsForm;
import com.amoGroup.amoGroup.patch.Patcher;
import com.amoGroup.amoGroup.repositories.ContactUsFormRepository;
import com.amoGroup.amoGroup.response.MessageResponse;
import com.amoGroup.amoGroup.services.contactUsForm.ContactUsFormService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@RequestMapping("/api/contact-us")
public class ContactUsFormController {


    @Autowired
    ContactUsFormService contactFormService;

    @Autowired
    ContactUsFormRepository repository;

    @Autowired
    Patcher patcher;

    @PostMapping("/create")
    public ResponseEntity<?> create(@Valid @RequestBody ContactUsForm request) {
        try {
            ContactUsForm contactForm = contactFormService.save(request);
            return ResponseEntity.ok(contactForm);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PostMapping("/update")
    public ResponseEntity<?> update(@Valid @RequestBody ContactUsForm request) {
        try {
            ContactUsForm contactForm = contactFormService.update(request);
            return ResponseEntity.ok(contactForm);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<?> patchUpdate(@PathVariable String id, @RequestBody ContactUsForm request) throws IllegalAccessException {
        try {
            ContactUsForm existing = repository.findById(id)
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
    public ResponseEntity<?> delete(@PathVariable String id) {
        try {

            boolean result = contactFormService.delete(id);
            if (result) {
                return ResponseEntity.ok(new MessageResponse(HttpStatus.OK, "ContactForm entity is deleted successfully"));
            } else {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(new MessageResponse(HttpStatus.BAD_REQUEST, "ContactForm entity is not found"));
            }
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> get(@PathVariable String id) {
        try {
            return ResponseEntity.ok(contactFormService.findById(id));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> list() {
        try {
            return ResponseEntity.ok(contactFormService.list());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @GetMapping("/count")
    public ResponseEntity<?> count() {
        try {
            return ResponseEntity.ok(contactFormService.count());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }
}
