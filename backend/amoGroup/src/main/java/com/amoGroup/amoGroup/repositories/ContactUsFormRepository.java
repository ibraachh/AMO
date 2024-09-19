package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.ContactUsForm;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactUsFormRepository extends MongoRepository<ContactUsForm, String> {
}
