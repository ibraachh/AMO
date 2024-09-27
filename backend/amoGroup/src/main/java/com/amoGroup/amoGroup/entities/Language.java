package com.amoGroup.amoGroup.entities;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Builder
@Data
@Document(collection = "languages")
public class Language extends BaseEntity {
    @Id
    private String id;

    @NotBlank
    private String name;

    @NotBlank
    @Size(min = 2, max = 3)
    private String code;
}
