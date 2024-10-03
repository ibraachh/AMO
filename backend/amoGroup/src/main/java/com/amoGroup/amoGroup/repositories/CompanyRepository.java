package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.Company;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.UniqueElements;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CompanyRepository extends MongoRepository<Company, String> {

    Optional<Company> findByName(String name);

    boolean existsByName(@NotBlank @UniqueElements String name);
}
