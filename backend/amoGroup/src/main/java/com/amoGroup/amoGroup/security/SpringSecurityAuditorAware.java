package com.amoGroup.amoGroup.security;

import com.amoGroup.amoGroup.repositories.UserRepository;
import com.amoGroup.amoGroup.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@Configuration
@EnableMongoAuditing
public class SpringSecurityAuditorAware implements AuditorAware<String> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();

            if (principal instanceof UserDetailsImpl) {
                UserDetailsImpl userDetails = (UserDetailsImpl) principal;
                // Return the username or ID for auditing
                return Optional.of(userDetails.getUsername());  // Assuming username is used
            }
        }

        return Optional.empty();
    }
}

