package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.Chronology;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChronologyRepository extends MongoRepository<Chronology, String> {
}
