package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TagRepository extends MongoRepository<Tag, String> {
}
