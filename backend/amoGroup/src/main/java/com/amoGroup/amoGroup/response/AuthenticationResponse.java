package com.amoGroup.amoGroup.response;

import com.amoGroup.amoGroup.entities.enums.TokenType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AuthenticationResponse {

    private String accessToken;
    private String refreshToken;
    private TokenType tokenType;
    private String id;
    private String username;
    private String email;
    private String role;

}
