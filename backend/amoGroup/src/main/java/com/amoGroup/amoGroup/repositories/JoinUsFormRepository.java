package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.JoinUsForm;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface JoinUsFormRepository extends MongoRepository<JoinUsForm, String> {
    boolean existsByEmail(String email);

    boolean existsByPhoneNumber(String phoneNumber);

    Optional<JoinUsForm> findByEmail(String email);

    Optional<JoinUsForm> findByPhoneNumber(String phoneNumber);
}
