package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.Company;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CompanyRepository extends MongoRepository<Company, String> {
}
