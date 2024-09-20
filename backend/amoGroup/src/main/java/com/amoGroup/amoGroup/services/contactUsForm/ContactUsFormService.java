package com.amoGroup.amoGroup.services.contactUsForm;

import com.amoGroup.amoGroup.entities.ContactUsForm;

import java.util.List;
import java.util.Optional;

public interface ContactUsFormService {
    ContactUsForm save(ContactUsForm contactUsForm);

    ContactUsForm update(ContactUsForm contactUsForm);

    boolean delete(String id);

    Optional<ContactUsForm> findById(String id);

    ContactUsForm findByEmail(String email);

    ContactUsForm findByPhone(String phone);

    List<ContactUsForm> list();

    long count();

}
