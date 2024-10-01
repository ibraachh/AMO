package com.amoGroup.amoGroup.services;

import com.amoGroup.amoGroup.entities.User;
import com.amoGroup.amoGroup.entities.dto.UserViewDTO;
import com.amoGroup.amoGroup.requests.LoginRequest;
import com.amoGroup.amoGroup.requests.RegisterRequest;
import com.amoGroup.amoGroup.response.AuthenticationResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

public interface AuthenticationService {

    void deleteById(String id) throws Exception;

    List<User> findAll() throws Exception;

    List<User> findByRole(String role) throws Exception;

    User getUser(String username) throws Exception;

    User register(RegisterRequest registerRequest);

    AuthenticationResponse authenticateUser(LoginRequest loginRequest);

    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;

    void logout(String username);

    List<UserViewDTO> findByRoleAndLoggedInOrderByLastLoginDateTimeDesc(String role, boolean loggedIn);

    User me(HttpServletRequest request);
}
