package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.ContactInfo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactInfoRepository extends MongoRepository<ContactInfo, String> {
}
