package com.amoGroup.amoGroup.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class EntityResponse {
    private String id;
    private String description;
    private String title;
}
