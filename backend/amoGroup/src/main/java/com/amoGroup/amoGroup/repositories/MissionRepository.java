package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.Mission;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MissionRepository extends MongoRepository<Mission, String> {
}
