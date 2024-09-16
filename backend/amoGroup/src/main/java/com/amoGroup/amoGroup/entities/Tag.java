package com.amoGroup.amoGroup.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "tags")
public class Tag {
    @Id
    private String id;
    private List<String> keys;
    private String title;
    private String description;
}
