package com.amoGroup.amoGroup.services.founderMessage;

import com.amoGroup.amoGroup.entities.FounderMessage;
import com.amoGroup.amoGroup.entities.translations.Translation;
import com.amoGroup.amoGroup.repositories.FounderMessageRepository;
import com.amoGroup.amoGroup.repositories.LanguageRepository;
import com.amoGroup.amoGroup.response.EntityResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class FounderMessageServiceImpl implements FounderMessageService {

    @Autowired
    FounderMessageRepository founderMessageRepository;

    @Autowired
    LanguageRepository languageRepository;

    @Override
    public FounderMessage add(FounderMessage founderMessage) {
        validateTranslations(founderMessage);
        return founderMessageRepository.insert(founderMessage);
    }

    @Override
    public FounderMessage update(FounderMessage founderMessage) {
        if (!founderMessageRepository.existsById(founderMessage.getId())) {
            throw new RuntimeException("Founder message with this id does not exist");
        }
        validateTranslations(founderMessage);

        return founderMessageRepository.save(founderMessage);
    }

    @Override
    public boolean delete(String id) {
        try {
            FounderMessage founderMessage = founderMessageRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("About with this id does not exist"));

            founderMessageRepository.delete(founderMessage);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<EntityResponse> getFounderMessages(String language) {
        return founderMessageRepository.findAll().stream()
                .map(founderMessage -> getTranslation(language, founderMessage))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

    @Override
    public Optional<EntityResponse> getFounderMessage(String id, String language) {
        if (!founderMessageRepository.existsById(id)) {
            throw new RuntimeException("Entity not found with this id");
        }
        return founderMessageRepository.findById(id)
                .flatMap(about -> getTranslation(language, about));
    }

    @Override
    public List<FounderMessage> getAllFounderMessages() {
        return founderMessageRepository.findAll();
    }

    @Override
    public Optional<FounderMessage> getFounderMessageWithTranslations(String id) {
        return founderMessageRepository.findById(id);
    }

    @Override
    public long count() {
        return founderMessageRepository.count();
    }

    private void validateTranslations(FounderMessage request) {
        if (request.getTranslations() != null) {
            Set<String> languageCodes = new HashSet<>();
            for (Translation translation : request.getTranslations()) {
                if (!languageRepository.existsByCode(translation.getLanguageCode())) {
                    throw new RuntimeException("Language with this code does not exists");
                }
                // Check for duplicate language codes
                if (!languageCodes.add(translation.getLanguageCode())) {
                    throw new RuntimeException("Duplicate language code found: " + translation.getLanguageCode());
                }
            }
        }
    }

    private Optional<EntityResponse> getTranslation(String language, FounderMessage founderMessage) {
        return founderMessage.getTranslations().stream()
                .filter(t -> language.contains(t.getLanguageCode()))
                .findFirst()
                .map(translation -> EntityResponse.builder()
                        .id(founderMessage.getId())
                        .description(translation.getDescription())
                        .title(translation.getTitle())
                        .build());
    }
}
