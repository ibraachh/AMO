package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.ContactForm;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ContactFormRepository extends MongoRepository<ContactForm, String> {
    boolean existsByEmail(String email);

    ContactForm findByEmail(String email);

    boolean existsByPhoneNumber(String phone);

    ContactForm findByPhoneNumber(String phone);

    List<ContactForm> findAllByOrderByDateDesc();
}
