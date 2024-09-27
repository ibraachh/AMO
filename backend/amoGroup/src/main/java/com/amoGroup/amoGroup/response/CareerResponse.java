package com.amoGroup.amoGroup.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
public class CareerResponse {
    private String id;
    private Date date;
    private String description;
    private String title;
}
