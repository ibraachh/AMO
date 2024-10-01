package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.Language;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface LanguageRepository extends MongoRepository<Language, String> {
    Optional<Language> findByName(String name);

    Optional<Language> findByCode(String code);

    Boolean existsByName(String name);

    Boolean existsByCode(String code);
}
