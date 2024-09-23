package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.News;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NewsRepository extends MongoRepository<News, String> {
}
