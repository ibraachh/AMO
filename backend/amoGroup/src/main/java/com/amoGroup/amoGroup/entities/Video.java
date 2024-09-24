package com.amoGroup.amoGroup.entities;


import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "videos")
public class Video extends BaseEntity{
    @Id
    private String id;
    private String videoUrl;
}
