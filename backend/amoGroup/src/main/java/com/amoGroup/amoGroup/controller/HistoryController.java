package com.amoGroup.amoGroup.controller;

import com.amoGroup.amoGroup.entities.History;
import com.amoGroup.amoGroup.patch.Patcher;
import com.amoGroup.amoGroup.repositories.HistoryRepository;
import com.amoGroup.amoGroup.response.EntityResponse;
import com.amoGroup.amoGroup.response.MessageResponse;
import com.amoGroup.amoGroup.services.history.HistoryService;
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
@RequestMapping("/api/history")
public class HistoryController {

    @Autowired
    HistoryService historyService;

    @Autowired
    HistoryRepository historyRepository;

    @Autowired
    Patcher patcher;

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PostMapping("/create")
    public ResponseEntity<History> create(@Valid @RequestBody History request) {
        try {
            History history = historyService.add(request);
            return ResponseEntity.ok(history);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PostMapping("/update")
    public ResponseEntity<History> update(@Valid @RequestBody History request) {
        try {
            History history = historyService.update(request);
            return ResponseEntity.ok(history);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @PatchMapping(path = "/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<History> patch(@PathVariable("id") String id, @RequestBody History patch) {
        try {
            History history = historyRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Not found"));
            patcher.patcher(history, patch);
            return ResponseEntity.ok(historyService.update(history));
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
            boolean result = historyService.delete(id);
            if (result) {
                return ResponseEntity.ok(new MessageResponse(HttpStatus.OK, "History entity is deleted successfully"));
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
            EntityResponse history = historyService.getHistory(id, language)
                    .orElseThrow(() -> new RuntimeException("Not found"));
            return ResponseEntity.ok(history);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<EntityResponse>> list(@RequestHeader(value = "Accept-Language", defaultValue = "az") String language) {
        try {
            return ResponseEntity.ok(historyService.getHistories(language));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @GetMapping("/listAll")
    public ResponseEntity<List<History>> listAllByType() {
        try {
            return ResponseEntity.ok(historyService.getAllHistories());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @GetMapping("/getWithTranslation/{id}")
    public ResponseEntity<History> get(@PathVariable String id) {
        try {
            History u = historyService.getHistoryWithTranslations(id)
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
            return ResponseEntity.ok(historyService.count());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }
}