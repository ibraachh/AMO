package com.amoGroup.amoGroup.services.contactUsForm;

import com.amoGroup.amoGroup.entities.ContactForm;
import com.amoGroup.amoGroup.repositories.ContactFormRepository;
import com.amoGroup.amoGroup.services.email.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ContactFormServiceImpl implements ContactFormService {

    @Value("${spring.mail.username}")
    private String from;

    @Autowired
    ContactFormRepository contactFormRepository;

    @Autowired
    EmailService emailService;

    @Override
    public ContactForm save(ContactForm contactForm) {
        String message = "<html>" +
                "<head>" +
                "<style>" +
                "body { font-family: Arial, sans-serif; color: #333; }" +
                ".container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; }" +
                ".header { background-color: #f4f4f4; padding: 10px; text-align: center; }" +
                ".content { margin: 20px 0; }" +
                ".footer { font-size: 0.9em; color: #777; text-align: center; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class='container'>" +
                "<div class='header'>" +
                "<h2>Yeni Müraciət</h2>" +
                "</div>" +
                "<div class='content'>" +
                "<p><strong>Ad:</strong> " + contactForm.getName() + " " + contactForm.getLastName() + "</p>" +
                "<p><strong>Əlaqə nömrəsi:</strong> " + contactForm.getPhoneNumber() + "</p>" +
                "<p><strong>Email:</strong> " + contactForm.getEmail() + "</p>" +
                "<p><strong>Mesaj:</strong></p>" +
                "<p>" + contactForm.getMessage() + "</p>" +
                "</div>" +
                "<div class='footer'>" +
                "<p>Bu bir avtomatik mesajdır. Zəhmət olmasa, cavab verməyin.</p>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";

        emailService.sendEmail(
                from,
                from,
                "Yeni müraciəti var",
                message
        );
        contactForm.setDate(new Date());
        return contactFormRepository.save(contactForm);
    }

    @Override
    public ContactForm update(ContactForm contactForm) {
        return contactFormRepository.save(contactForm);
    }

    @Override
    public boolean delete(String id) {
        try {
            contactFormRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    @Override
    public Optional<ContactForm> findById(String id) {
        if (!contactFormRepository.existsById(id)) {
            throw new RuntimeException("Entity not found with this id");
        }
        return contactFormRepository.findById(id);
    }

    @Override
    public ContactForm findByEmail(String email) {
        if (!contactFormRepository.existsByEmail(email)) {
            throw new RuntimeException("Entity not found with this id");
        }
        return contactFormRepository.findByEmail(email);
    }

    @Override
    public ContactForm findByPhone(String phone) {
        if (!contactFormRepository.existsByPhoneNumber(phone)) {
            throw new RuntimeException("Entity not found with this id");
        }
        return contactFormRepository.findByPhoneNumber(phone);
    }

    @Override
    public List<ContactForm> list() {
        return contactFormRepository.findAllByOrderByDateDesc();
    }

    @Override
    public long count() {
        return contactFormRepository.count();
    }
}
