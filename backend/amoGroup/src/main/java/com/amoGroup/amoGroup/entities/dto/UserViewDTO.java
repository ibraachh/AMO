package com.amoGroup.amoGroup.entities.dto;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Data
public class UserViewDTO {
    @Id
    private String id;

    private String username;

    private String email;

    private String role;

    private Date lastLoginDateTime;
    private boolean loggedIn;
}
