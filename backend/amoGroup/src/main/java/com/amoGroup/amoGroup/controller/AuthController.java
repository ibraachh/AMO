package com.amoGroup.amoGroup.controller;

import com.amoGroup.amoGroup.repositories.UserRepository;
import com.amoGroup.amoGroup.requests.LoginRequest;
import com.amoGroup.amoGroup.requests.RegisterRequest;
import com.amoGroup.amoGroup.response.AuthenticationResponse;
import com.amoGroup.amoGroup.response.MessageResponse;
import com.amoGroup.amoGroup.services.AuthenticationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    UserRepository userRepository;

    private static final String ADMIN_USER_NAME = "admin";

    @PostConstruct
    void init() {
        if (userRepository.findAll().isEmpty()) {
            try {
                authenticationService.register(RegisterRequest.builder()
                        .password("123456")
                        .username(ADMIN_USER_NAME)
                        .role(ADMIN_USER_NAME)
                        .email("admin@admin.com")
                        .build());
            } catch (Exception ex) {
                Logger.getLogger(AuthController.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @Valid @RequestBody LoginRequest loginRequest,
            HttpServletRequest httpRequest
    ) {
        AuthenticationResponse response = authenticationService.authenticateUser(loginRequest);
        if (response != null) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .build();
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        try {
            authenticationService.refreshToken(request, response);
            return ResponseEntity.status(200).body("Token refreshed successfully");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @GetMapping("/verify-token")
    public ResponseEntity<?> verifyToken() {
        try {
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse(HttpStatus.UNAUTHORIZED, e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(HttpServletRequest request) {
        try {
            return ResponseEntity.ok(authenticationService.me(request));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse(HttpStatus.UNAUTHORIZED, e.getMessage()));
        }
    }
}
