package com.amoGroup.amoGroup.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CompanyCardResponse {
    private String id;
    private String category;
    private String title;
    private String description;
}
