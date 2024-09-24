package com.amoGroup.amoGroup.services.email;

import java.util.List;

public interface EmailService {
    void sendEmail(String from, String to, String subject, String text);

    void sendMailWithAttachment(String from, String to, String subject, String text, List<String> ticketFiles);
}
