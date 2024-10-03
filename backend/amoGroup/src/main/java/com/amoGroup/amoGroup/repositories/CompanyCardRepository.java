package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.CompanyCard;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CompanyCardRepository extends MongoRepository<CompanyCard, String> {

    List<CompanyCard> findAllByCompanyId(String companyId);
}
