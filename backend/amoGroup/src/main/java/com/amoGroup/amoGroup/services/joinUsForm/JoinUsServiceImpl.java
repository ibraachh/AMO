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

            String subject = "Yeni iş müraciəti var";

            String emailContent = "<html>" +
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
                    "<h2>Yeni İş Müraciəti</h2>" +
                    "</div>" +
                    "<div class='content'>" +
                    "<p><strong>Ad:</strong> " + joinUsForm.getName() + " " + joinUsForm.getLastName() + "</p>" +
                    "<p><strong>Əlaqə nömrəsi:</strong> " + joinUsForm.getPhoneNumber() + "</p>" +
                    "<p><strong>Email:</strong> " + joinUsForm.getEmail() + "</p>" +
                    "</div>" +
                    "<div class='footer'>" +
                    "<p>Bu bir avtomatik mesajdır. Zəhmət olmasa, cavab verməyin.</p>" +
                    "</div>" +
                    "</div>" +
                    "</body>" +
                    "</html>";

            emailService.sendMailWithAttachment(
                    from,
                    from,
                    subject,
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
            if (joinUsForm.getFile() != null) {
                storageService.deleteExistingImages(joinUsForm.getFile());
            }
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
