package com.amoGroup.amoGroup.services.joinUsForm;

import com.amoGroup.amoGroup.entities.JoinUsForm;
import com.amoGroup.amoGroup.repositories.JoinUsFormRepository;
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
public class JoinUsServiceImpl implements JoinUsService {

    @Value("${spring.mail.username}")
    private String from;

    @Autowired
    JoinUsFormRepository joinUsFormRepository;

    @Autowired
    EmailService emailService;

    @Override
    public JoinUsForm save(JoinUsForm joinUsForm) {
        String emailContent = joinUsForm.getName() + " " + joinUsForm.getLastName() +
                " yeni təlim müraciəti göndərib. " +
                "Əlaqə nömrəsi: " + joinUsForm.getPhoneNumber() +
                " Email: " + joinUsForm.getEmail() +
//                TODO attach file to email
                " Fayl: " + joinUsForm.getFile();
        emailService.sendEmail(
                from,
                from,
                "Yeni təlim müraciəti var",
                emailContent
        );
        joinUsForm.setDate(new Date());
        return joinUsFormRepository.save(joinUsForm);
    }

    @Override
    public JoinUsForm update(JoinUsForm joinUsForm) {
        return joinUsFormRepository.save(joinUsForm);
    }

    @Override
    public boolean delete(String id) {
        try {
            joinUsFormRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    @Override
    public Optional<JoinUsForm> findById(String id) {
        if (joinUsFormRepository.existsById(id)) {
            return joinUsFormRepository.findById(id);
        } else {
            throw new RuntimeException("JoinUsForm not found with given id");
        }
    }

    @Override
    public JoinUsForm findByEmail(String email) {
        return joinUsFormRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("JoinUsForm not found with given email"));

    }

    @Override
    public JoinUsForm findByPhone(String phone) {
        return joinUsFormRepository.findByPhoneNumber(phone)
                .orElseThrow(() -> new RuntimeException("JoinUsForm not found with given phone number"));
    }

    @Override
    public List<JoinUsForm> list() {
        return joinUsFormRepository.findAll();
    }

    @Override
    public long count() {
        return joinUsFormRepository.count();
    }
}
