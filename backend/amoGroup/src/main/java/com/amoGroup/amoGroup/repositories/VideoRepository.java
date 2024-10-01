package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface VideoRepository extends MongoRepository<Video, String> {
    boolean existsByVideoUrl(String videoUrl);

    Optional<Video> findByVideoUrl(String videoUrl);
}
