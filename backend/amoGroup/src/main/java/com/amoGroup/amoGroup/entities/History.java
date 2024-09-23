package com.amoGroup.amoGroup.entities;

import com.amoGroup.amoGroup.entities.translations.Translation;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "history")
public class History {
    @Id
    private String id;
    private List<Translation> translations;

}
