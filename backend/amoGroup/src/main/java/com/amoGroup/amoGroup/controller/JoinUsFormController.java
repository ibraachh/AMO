package com.amoGroup.amoGroup.controller;

import com.amoGroup.amoGroup.entities.JoinUsForm;
import com.amoGroup.amoGroup.patch.Patcher;
import com.amoGroup.amoGroup.repositories.JoinUsFormRepository;
import com.amoGroup.amoGroup.response.MessageResponse;
import com.amoGroup.amoGroup.services.joinUsForm.JoinUsService;
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
@RequestMapping("/api/join-us")
public class JoinUsFormController {

    @Autowired
    JoinUsService joinUsService;

    @Autowired
    JoinUsFormRepository repository;

    @Autowired
    Patcher patcher;

    @PostMapping("/create")
    public ResponseEntity<JoinUsForm> create(@Valid @RequestBody JoinUsForm request) {
        try {
            JoinUsForm joinForm = joinUsService.save(request);
            return ResponseEntity.ok(joinForm);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PostMapping("/update")
    public ResponseEntity<JoinUsForm> update(@Valid @RequestBody JoinUsForm request) {
        try {
            JoinUsForm joinForm = joinUsService.update(request);
            return ResponseEntity.ok(joinForm);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<JoinUsForm> patchUpdate(@PathVariable String id, @RequestBody JoinUsForm request) throws IllegalAccessException {
        try {
            JoinUsForm joinForm = repository.findById(id)
                    .orElseThrow(() -> new IllegalAccessException("Join Us Form not found"));
            patcher.patcher(request, joinForm);
            return ResponseEntity.ok(joinUsService.update(joinForm));
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

            boolean result = joinUsService.delete(id);
            if (result) {
                return ResponseEntity.ok(new MessageResponse(HttpStatus.OK, "JoinUsForm entity is deleted successfully"));
            } else {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(new MessageResponse(HttpStatus.BAD_REQUEST, "JoinUsForm entity is not found"));
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
            return ResponseEntity.ok(joinUsService.findById(id));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @GetMapping("/list")
    public ResponseEntity<List<JoinUsForm>> list() {
        try {
            return ResponseEntity.ok(joinUsService.list());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @GetMapping("/count")
    public ResponseEntity<?> count() {
        try {
            return ResponseEntity.ok(joinUsService.count());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }
}
