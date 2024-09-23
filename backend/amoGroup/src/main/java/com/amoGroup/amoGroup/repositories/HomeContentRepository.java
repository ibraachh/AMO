package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.HomeContent;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HomeContentRepository extends MongoRepository<HomeContent, String> {
}
