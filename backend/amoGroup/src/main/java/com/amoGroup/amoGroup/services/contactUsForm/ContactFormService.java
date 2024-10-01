package com.amoGroup.amoGroup.services.contactUsForm;

import com.amoGroup.amoGroup.entities.ContactForm;

import java.util.List;
import java.util.Optional;

public interface ContactFormService {
    ContactForm save(ContactForm contactForm);

    ContactForm update(ContactForm contactForm);

    boolean delete(String id);

    Optional<ContactForm> findById(String id);

    ContactForm findByEmail(String email);

    ContactForm findByPhone(String phone);

    List<ContactForm> list();

    long count();

}
