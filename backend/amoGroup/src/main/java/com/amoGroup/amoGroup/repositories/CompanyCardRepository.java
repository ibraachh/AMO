package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.CompanyCard;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CompanyCardRepository extends MongoRepository<CompanyCard, String> {
}
