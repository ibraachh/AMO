package com.amoGroup.amoGroup.entities;

import com.amoGroup.amoGroup.entities.translations.Translation;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "missions")
public class Mission extends BaseEntity {
    @Id
    private String id;
    private List<Translation> translations;
}
