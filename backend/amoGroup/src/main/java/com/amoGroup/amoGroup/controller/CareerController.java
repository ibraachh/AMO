package com.amoGroup.amoGroup.controller;


import com.amoGroup.amoGroup.entities.About;
import com.amoGroup.amoGroup.entities.Career;
import com.amoGroup.amoGroup.patch.Patcher;
import com.amoGroup.amoGroup.repositories.CareerRepository;
import com.amoGroup.amoGroup.response.CareerResponse;
import com.amoGroup.amoGroup.response.EntityResponse;
import com.amoGroup.amoGroup.response.MessageResponse;
import com.amoGroup.amoGroup.services.career.CareerService;
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
@RequestMapping("/api/career")
public class CareerController {

    @Autowired
    CareerService careerService;

    @Autowired
    Patcher patcher;

    @Autowired
    CareerRepository careerRepository;

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PostMapping("/create")
    public ResponseEntity<Career> create(@Valid @RequestBody Career request) {
        try {
            Career career = careerService.add(request);
            return ResponseEntity.ok(career);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PostMapping("/update")
    public ResponseEntity<Career> update(@Valid @RequestBody Career request) {
        try {
            Career career = careerService.update(request);
            return ResponseEntity.ok(career);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<Career> patch(@PathVariable String id, @RequestBody Career patch) {
        try {
            Career career = careerRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Career with this id does not exist"));
            patcher.patcher(career, patch);
            return ResponseEntity.ok(careerService.update(career));
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
            boolean result = careerService.delete(id);
            if (result) {
                return ResponseEntity.ok(new MessageResponse(HttpStatus.OK, "Career entity is deleted successfully"));
            }
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, "Career entity not found"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<CareerResponse> get(@RequestHeader(value = "Accept-Language", defaultValue = "az") String language, @PathVariable String id) {
        try {
            CareerResponse u = careerService.getCareer(id, language)
                    .orElseThrow(() -> new RuntimeException("Entity not found with this id"));
            return ResponseEntity.ok(u);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<CareerResponse>> list(@RequestHeader(value = "Accept-Language", defaultValue = "az") String language) {
        try {
            return ResponseEntity.ok(careerService.getCareers(language));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @GetMapping("/listAll")
    public ResponseEntity<List<Career>> listAllByType() {
        try {
            return ResponseEntity.ok(careerService.getAllCareers());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @GetMapping("/getWithTranslation/{id}")
    public ResponseEntity<Career> get(@PathVariable String id) {
        try {
            Career u = careerService.getCareerWithTranslations(id)
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
            return ResponseEntity.ok(careerService.count());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }
}
