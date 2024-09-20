package com.amoGroup.amoGroup.services.email;

public interface EmailService {
    void sendEmail(String from, String to, String subject, String text);
}
