package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.About;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AboutRepository extends MongoRepository<About, String> {
}
