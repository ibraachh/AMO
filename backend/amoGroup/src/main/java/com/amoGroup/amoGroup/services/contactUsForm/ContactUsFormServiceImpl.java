package com.amoGroup.amoGroup.services.contactUsForm;

import com.amoGroup.amoGroup.entities.ContactUsForm;
import com.amoGroup.amoGroup.repositories.ContactUsFormRepository;
import com.amoGroup.amoGroup.services.email.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ContactUsFormServiceImpl implements ContactUsFormService{

    @Value("${spring.mail.username}")
    private String from;

    @Autowired
    ContactUsFormRepository contactUsFormRepository;

    @Autowired
    EmailService emailService;

    @Override
    public ContactUsForm save(ContactUsForm contactUsForm) {
        return null;
    }

    @Override
    public ContactUsForm update(ContactUsForm contactUsForm) {
        return null;
    }

    @Override
    public boolean delete(String id) {
        return false;
    }

    @Override
    public Optional<ContactUsForm> findById(String id) {
        return Optional.empty();
    }

    @Override
    public ContactUsForm findByEmail(String email) {
        return null;
    }

    @Override
    public ContactUsForm findByPhone(String phone) {
        return null;
    }

    @Override
    public List<ContactUsForm> list() {
        return List.of();
    }

    @Override
    public long count() {
        return 0;
    }
}
