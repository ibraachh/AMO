package com.amoGroup.amoGroup.services;

import com.amoGroup.amoGroup.entities.Token;
import com.amoGroup.amoGroup.entities.User;
import com.amoGroup.amoGroup.entities.dto.UserViewDTO;
import com.amoGroup.amoGroup.entities.enums.TokenType;
import com.amoGroup.amoGroup.repositories.TokenRepository;
import com.amoGroup.amoGroup.repositories.UserRepository;
import com.amoGroup.amoGroup.requests.LoginRequest;
import com.amoGroup.amoGroup.requests.RegisterRequest;
import com.amoGroup.amoGroup.response.AuthenticationResponse;
import com.amoGroup.amoGroup.security.jwt.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TokenRepository tokenRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtService jwtService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    ModelMapper modelMapper;

    private static final String ERROR_EMAIL_IS_ALREADY_TAKEN = "Error: Email is already taken!";
    private static final String ERROR_USERNAME_IS_ALREADY_TAKEN = "Error: Username is already taken!";
    private static final String ERROR_ROLE_IS_NOT_FOUND = "Error: Role is not found.";
    private static final String ROLE_ADMIN_STR = "ROLE_ADMIN";

    @Override
    public User register(RegisterRequest registerRequest) {

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new UsernameNotFoundException(ERROR_USERNAME_IS_ALREADY_TAKEN);
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new UsernameNotFoundException(ERROR_EMAIL_IS_ALREADY_TAKEN);
        }

        var user = User.builder()
                .username(registerRequest.getUsername())
                .email(registerRequest.getEmail())
                .password(encoder.encode(registerRequest.getPassword()))
                .role(ROLE_ADMIN_STR)
                .build();

        return userRepository.save(user);
    }

    @Override
    public AuthenticationResponse authenticateUser(LoginRequest loginRequest) {
        try {
            var user = userRepository.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + loginRequest.getUsername()));

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            var userDetails = (UserDetails) authentication.getPrincipal();

            String jwtToken = jwtService.generateJwtToken(authentication);
            String refreshToken = jwtService.generateRefreshToken(userDetails);

//            revokeAllUserTokens(user);
            saveUserToken(user, jwtToken);
            userRepository.save(user);

            return AuthenticationResponse.builder()
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .role(user.getRole())
                    .tokenType(TokenType.BEARER)
                    .accessToken(jwtToken)
                    .refreshToken(refreshToken)
                    .build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }
    }

    @Override
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader("Authorization");
        final String refreshToken;
        final String email;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }

        refreshToken = authHeader.substring(7);
        email = jwtService.extractUsername(refreshToken);
        if (email != null) {
            User user = userRepository.findByEmail(email)
                    .orElseThrow();

            UserDetails userDetails = UserDetailsImpl.build(user);

            if (jwtService.isTokenValid(refreshToken, userDetails)) {

                var accessToken = jwtService.generateJwtToken(userDetails);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);

                var authenticationResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .tokenType(TokenType.BEARER)
                        .email(user.getEmail())
                        .build();

                new ObjectMapper().writeValue(response.getOutputStream(), authenticationResponse);

            }
        }

    }

    @Override
    public User getUser(String username) throws Exception {
        Optional<User> u = userRepository.findByUsername(username);
        if (u.isPresent()) {
            return u.get();
        }
        throw new UsernameNotFoundException("Not found.");
    }

    @Override
    public List<User> findAll() throws Exception {
        return userRepository.findAll();
    }

    @Override
    public List<User> findByRole(String role) throws Exception {
        return userRepository.findByRole(role);
    }

    @Override
    public void deleteById(String id) throws Exception {
        userRepository.deleteById(id);
    }

    @Override
    public void logout(String email) {
        var user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            User usr = user.get();
            usr.setLoggedIn(false);
            userRepository.save(usr);
        }
    }

    @Override
    public List<UserViewDTO> findByRoleAndLoggedInOrderByLastLoginDateTimeDesc(String role, boolean loggedIn) {
        Query query = new Query();
        query.addCriteria(Criteria.where("loggedIn").is(loggedIn).and("roles").is(role));
        List<User> list = mongoTemplate.find(query.with(Sort.by(Sort.Order.desc("lastLoginDateTime"))), User.class);
        List<UserViewDTO> listForView = list.stream().map(this::convertUserToUserViewDto).collect(Collectors.toList());
        return listForView;
    }

    @Override
    public User me(HttpServletRequest request) {
        String username = jwtService.extractUsername(request.getHeader("Authorization").substring(7));
        return userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User Not Found with username: " + username));
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .user(user)
                .build();

        tokenRepository.save(token);
    }

    private UserViewDTO convertUserToUserViewDto(User user) {
        UserViewDTO userViewDto = modelMapper.map(user, UserViewDTO.class);
        return userViewDto;
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if (validUserTokens.isEmpty()) {
            return;
        }

        validUserTokens.forEach(token -> {
            token.setRevoked(true);
            token.setExpired(true);
            tokenRepository.save(token);
        });
        tokenRepository.saveAll(validUserTokens);
    }
}
