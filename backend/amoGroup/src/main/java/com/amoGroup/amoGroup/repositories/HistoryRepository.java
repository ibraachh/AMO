package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.History;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HistoryRepository extends MongoRepository<History, String> {
}
