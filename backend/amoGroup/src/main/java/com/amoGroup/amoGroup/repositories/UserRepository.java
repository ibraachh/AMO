package com.amoGroup.amoGroup.repositories;

import com.amoGroup.amoGroup.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    List<User> findByRole(String role);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

}
