package com.amoGroup.amoGroup.controller;

import com.amoGroup.amoGroup.entities.ContactInfo;
import com.amoGroup.amoGroup.patch.Patcher;
import com.amoGroup.amoGroup.repositories.ContactInfoRepository;
import com.amoGroup.amoGroup.response.MessageResponse;
import com.amoGroup.amoGroup.services.contactInfo.ContactInfoService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@RequestMapping("/api/contact-info")
public class ContactInfoController {

    @Autowired
    ContactInfoService contactInfoService;

    @Autowired
    ContactInfoRepository contactInfoRepository;

    @Autowired
    Patcher patcher;

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PostMapping("/create")
    public ResponseEntity<ContactInfo> create(@Valid @RequestBody ContactInfo request) {
        try {
            ContactInfo contactInfo = contactInfoService.add(request);
            return ResponseEntity.ok(contactInfo);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PostMapping("/update")
    public ResponseEntity<ContactInfo> update(@Valid @RequestBody ContactInfo request) {
        try {
            ContactInfo contactInfo = contactInfoService.update(request);
            return ResponseEntity.ok(contactInfo);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<ContactInfo> patchUpdate(@PathVariable String id, @RequestBody ContactInfo request) throws IllegalAccessException {
        try {
            ContactInfo existingContact = contactInfoRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("There is no contact info with given id"));
            patcher.patcher(existingContact, request);

            return ResponseEntity.ok(contactInfoService.update(existingContact));
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
            boolean result = contactInfoService.delete(id);
            if (result) {
                return ResponseEntity.ok(new MessageResponse(HttpStatus.OK, "Contact info entity is deleted successfully"));
            }
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, "Contact Info entity not found"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> get(@PathVariable String id) {
        try {
            Optional<ContactInfo> u = contactInfoService.getContactInfo(id);
            return ResponseEntity.ok(u);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<ContactInfo>> list() {
        try {
            return ResponseEntity.ok(contactInfoService.getContactInfos());
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
            return ResponseEntity.ok(contactInfoService.count());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }
}
