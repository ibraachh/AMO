package com.amoGroup.amoGroup.services.joinUsForm;

import com.amoGroup.amoGroup.entities.JoinUsForm;

import java.util.List;
import java.util.Optional;

public interface JoinUsService {
    JoinUsForm save(JoinUsForm joinUsForm);

    JoinUsForm update(JoinUsForm joinUsForm);

    boolean delete(String id);

    Optional<JoinUsForm> findById(String id);

    JoinUsForm findByEmail(String email);

    JoinUsForm findByPhone(String phone);

    List<JoinUsForm> list();

    long count();
}
