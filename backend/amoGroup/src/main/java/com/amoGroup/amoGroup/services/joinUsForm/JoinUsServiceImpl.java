package com.amoGroup.amoGroup.services.joinUsForm;

import com.amoGroup.amoGroup.entities.JoinUsForm;
import com.amoGroup.amoGroup.repositories.JoinUsFormRepository;
import com.amoGroup.amoGroup.services.email.EmailService;
import com.amoGroup.amoGroup.services.storage.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
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

    @Autowired
    StorageService storageService;

    @Override
    public JoinUsForm save(JoinUsForm joinUsForm) {
        try {
            Path uploadDir = Paths.get("uploads");
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }

            List<String> paths = new ArrayList<>();
            Path path = Paths.get(uploadDir.toString(), joinUsForm.getFile());
            paths.add(path.toString());

            String emailContent = joinUsForm.getName() + " " + joinUsForm.getLastName() +
                    " yeni təlim müraciəti göndərib. " +
                    "Əlaqə nömrəsi: " + joinUsForm.getPhoneNumber() +
                    " Email: " + joinUsForm.getEmail();
            emailService.sendMailWithAttachment(
                    from,
                    from,
                    "Yeni təlim müraciəti var",
                    emailContent,
                    paths
            );
        } catch (Exception e) {
            log.error(e.getMessage());
        }
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
            JoinUsForm joinUsForm = joinUsFormRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("JoinUsForm with this id does not exists"));
            storageService.deleteExistingImages(joinUsForm.getFile());
            joinUsFormRepository.delete(joinUsForm);
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
