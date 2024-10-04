package com.amoGroup.amoGroup.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class CompanyResponse {
    private String id;
    private String description;
    private String title;
    private String logo;
    private List<CompanyCardResponse> companyCards;
}
