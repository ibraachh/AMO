package com.amoGroup.amoGroup.services.founderMessage;

import com.amoGroup.amoGroup.entities.FounderMessage;
import com.amoGroup.amoGroup.response.EntityResponse;

import java.util.List;
import java.util.Optional;

public interface FounderMessageService {
    FounderMessage add(FounderMessage founderMessage);

    FounderMessage update(FounderMessage founderMessage);

    boolean delete(String id);

    List<EntityResponse> getFounderMessages(String language);

    Optional<EntityResponse> getFounderMessage(String id, String language);

    List<FounderMessage> getAllFounderMessages();

    Optional<FounderMessage> getFounderMessageWithTranslations(String id);

    long count();
}
