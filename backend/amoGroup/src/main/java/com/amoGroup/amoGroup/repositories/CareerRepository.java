package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.Career;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CareerRepository extends MongoRepository<Career, String> {
}
