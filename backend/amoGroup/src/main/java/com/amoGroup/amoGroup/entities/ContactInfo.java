package com.amoGroup.amoGroup.entities;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "contactInfo")
public class ContactInfo extends BaseEntity{
    @Id
    private String id;
    private String phoneNumber;
    private String email;
    private String fax;
    private Map<String, String> socials;
    private String city;
    private String location;
}
