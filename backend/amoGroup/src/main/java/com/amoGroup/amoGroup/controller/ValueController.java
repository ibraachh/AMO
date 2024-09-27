package com.amoGroup.amoGroup.controller;

import com.amoGroup.amoGroup.entities.Value;
import com.amoGroup.amoGroup.patch.Patcher;
import com.amoGroup.amoGroup.repositories.ValueRepository;
import com.amoGroup.amoGroup.response.EntityResponse;
import com.amoGroup.amoGroup.response.MessageResponse;
import com.amoGroup.amoGroup.services.value.ValueService;
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
@RequestMapping("/api/value")
public class ValueController {

    @Autowired
    ValueService valueService;

    @Autowired
    ValueRepository valueRepository;

    @Autowired
    Patcher patcher;

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PostMapping("/create")
    public ResponseEntity<Value> create(@Valid @RequestBody Value request) {
        try {
            Value value = valueService.add(request);
            return ResponseEntity.ok(value);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PostMapping("/update")
    public ResponseEntity<Value> update(@Valid @RequestBody Value request) {
        try {
            Value value = valueService.update(request);
            return ResponseEntity.ok(value);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<Value> patch(@PathVariable String id, @RequestBody Value patch) {
        try {
            Value value = valueRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Value with this id does not exist"));
            patcher.patcher(value, patch);
            return ResponseEntity.ok(valueRepository.save(value));
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
            boolean result = valueService.delete(id);
            if (result) {
                return ResponseEntity.ok(new MessageResponse(HttpStatus.OK, "Value entity is deleted successfully"));
            }
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<EntityResponse> get(@RequestHeader(value = "Accept-Language", defaultValue = "az") String language, @PathVariable String id) {
        try {
            EntityResponse u = valueService.getValue(id, language)
                    .orElseThrow(() -> new RuntimeException("Value with this id does not exist"));
            return ResponseEntity.ok(u);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<EntityResponse>> list(@RequestHeader(value = "Accept-Language", defaultValue = "az") String language) {
        try {
            return ResponseEntity.ok(valueService.getValues(language));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @GetMapping("/listAll")
    public ResponseEntity<List<Value>> listAllByType() {
        try {
            return ResponseEntity.ok(valueService.getAllValues());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @GetMapping("/getWithTranslation/{id}")
    public ResponseEntity<Value> get(@PathVariable String id) {
        try {
            Value u = valueService.getValueWithTranslations(id)
                    .orElseThrow(() -> new RuntimeException("Entity not found with this id"));
            return ResponseEntity.ok(u);
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
            return ResponseEntity.ok(valueService.count());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }
}
