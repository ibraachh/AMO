package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.AboutUs;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AboutUsRepository extends MongoRepository<AboutUs, String> {
}
