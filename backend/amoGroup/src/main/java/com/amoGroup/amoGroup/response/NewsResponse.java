package com.amoGroup.amoGroup.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class NewsResponse {
    private String id;
    private String image;
    private String description;
    private String title;
}
