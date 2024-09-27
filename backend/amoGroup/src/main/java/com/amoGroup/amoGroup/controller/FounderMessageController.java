package com.amoGroup.amoGroup.controller;


import com.amoGroup.amoGroup.entities.FounderMessage;
import com.amoGroup.amoGroup.patch.Patcher;
import com.amoGroup.amoGroup.repositories.FounderMessageRepository;
import com.amoGroup.amoGroup.response.EntityResponse;
import com.amoGroup.amoGroup.response.MessageResponse;
import com.amoGroup.amoGroup.services.founderMessage.FounderMessageService;
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
@RequestMapping("/api/founderMessage")
public class FounderMessageController {

    @Autowired
    FounderMessageService founderMessageService;

    @Autowired
    FounderMessageRepository founderMessageRepository;

    @Autowired
    Patcher patcher;

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PostMapping("/create")
    public ResponseEntity<FounderMessage> create(@Valid @RequestBody FounderMessage request) {
        try {
            FounderMessage founderMessage = founderMessageService.add(request);
            return ResponseEntity.ok(founderMessage);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PostMapping("/update")
    public ResponseEntity<FounderMessage> update(@Valid @RequestBody FounderMessage request) {
        try {
            FounderMessage founderMessage = founderMessageService.update(request);
            return ResponseEntity.ok(founderMessage);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<FounderMessage> patch(@PathVariable("id") String id, @RequestBody FounderMessage patch) {
        try {
            FounderMessage founderMessage = founderMessageRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Not found"));
            patcher.patcher(founderMessage, patch);
            return ResponseEntity.ok(founderMessageRepository.save(founderMessage));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @GetMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") String id) {
        try {
            boolean result = founderMessageService.delete(id);
            if (result) {
                return ResponseEntity.ok(new MessageResponse(HttpStatus.OK, "Founder message is deleted successfully"));
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
    public ResponseEntity<EntityResponse> get(@RequestHeader(value = "Accept-Language", defaultValue = "az") String language, @PathVariable String id) {
        try {
            EntityResponse founderMessage = founderMessageService.getFounderMessage(id, language)
                    .orElseThrow(() -> new RuntimeException("Not found"));
            return ResponseEntity.ok(founderMessage);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<EntityResponse>> list(@RequestHeader(value = "Accept-Language", defaultValue = "az") String language) {
        try {
            return ResponseEntity.ok(founderMessageService.getFounderMessages(language));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @GetMapping("/listAll")
    public ResponseEntity<List<FounderMessage>> listAllByType() {
        try {
            return ResponseEntity.ok(founderMessageService.getAllFounderMessages());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @GetMapping("/getWithTranslation/{id}")
    public ResponseEntity<FounderMessage> get(@PathVariable String id) {
        try {
            FounderMessage u = founderMessageService.getFounderMessageWithTranslations(id)
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
            return ResponseEntity.ok(founderMessageService.count());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }
}
