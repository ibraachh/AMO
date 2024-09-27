package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.FounderMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FounderMessageRepository extends MongoRepository<FounderMessage, String> {
}
