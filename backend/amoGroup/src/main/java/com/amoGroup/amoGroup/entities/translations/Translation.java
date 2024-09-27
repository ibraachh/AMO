package com.amoGroup.amoGroup.entities.translations;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Translation {
    private String title;
    private String description;
    private String languageCode;
}
