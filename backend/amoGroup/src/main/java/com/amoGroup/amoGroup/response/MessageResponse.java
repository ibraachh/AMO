package com.amoGroup.amoGroup.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Builder
@Data
@AllArgsConstructor
public class MessageResponse {
    private HttpStatus statusCode;
    private String message;

    public MessageResponse(String message) {
        this.message = message;
    }
}
