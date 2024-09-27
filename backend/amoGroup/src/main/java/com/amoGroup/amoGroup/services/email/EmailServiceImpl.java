package com.amoGroup.amoGroup.services.email;

import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.List;

@Service
@Slf4j
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void sendEmail(String from, String to, String subject, String text) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);

            javaMailSender.send(message);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void sendMailWithAttachment(String from, String to, String subject, String text, List<String> ticketFiles) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);

            for (String ticketFile : ticketFiles) {
                FileSystemResource file = new FileSystemResource(new File(ticketFile));
                helper.addAttachment(new File(ticketFile).getName(), file);
            }
            javaMailSender.send(message);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }
}