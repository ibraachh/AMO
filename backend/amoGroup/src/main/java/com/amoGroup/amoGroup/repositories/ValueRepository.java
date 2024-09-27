package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.Value;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ValueRepository extends MongoRepository<Value, String> {
}
