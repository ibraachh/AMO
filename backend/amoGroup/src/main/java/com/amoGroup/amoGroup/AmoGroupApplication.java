package com.amoGroup.amoGroup;

import com.amoGroup.amoGroup.properties.StorageProperties;
import com.amoGroup.amoGroup.services.storage.StorageService;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class AmoGroupApplication {

    public static void main(String[] args) {
        SpringApplication.run(AmoGroupApplication.class, args);
    }

    @Bean
    CommandLineRunner init(StorageService storageService) {
        return (args) -> {
            storageService.init();
        };
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
