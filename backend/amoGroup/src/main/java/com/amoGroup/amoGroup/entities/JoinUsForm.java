package com.amoGroup.amoGroup.entities;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Builder
@Data
@Document(collection = "joinUsForms")
public class JoinUsForm {
    @Id
    private String id;
    private String name;
    private String lastName;
    private String email;
    private String phoneNumber;
    private Date date;
    private String file;
}
