package com.amoGroup.amoGroup.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Data
@Document(collection = "contactInfo")
public class ContactInfo {
    @Id
    private String id;
    private String phoneNumber;
    private String email;
    private String fax;
    private Map<String, String> socials;
    private String city;
    private String location;
}
