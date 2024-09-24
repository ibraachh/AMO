package com.amoGroup.amoGroup.entities;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Builder
@Data
@Document(collection = "contactUsForms")
public class ContactForm {
    @Id
    private String id;
    private String name;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String message;
    private Date date;
}
