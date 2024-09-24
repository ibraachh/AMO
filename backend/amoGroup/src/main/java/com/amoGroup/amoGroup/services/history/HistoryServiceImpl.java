package com.amoGroup.amoGroup.services.history;

import com.amoGroup.amoGroup.entities.FounderMessage;
import com.amoGroup.amoGroup.entities.History;
import com.amoGroup.amoGroup.entities.translations.Translation;
import com.amoGroup.amoGroup.repositories.HistoryRepository;
import com.amoGroup.amoGroup.repositories.LanguageRepository;
import com.amoGroup.amoGroup.response.EntityResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class HistoryServiceImpl implements HistoryService {

    @Autowired
    HistoryRepository historyRepository;

    @Autowired
    LanguageRepository languageRepository;

    @Override
    public History add(History history) {
        validateTranslations(history);
        if (!historyRepository.findAll().isEmpty()) {
            throw new RuntimeException("History is already exists. Try to edit it");
        }
        return historyRepository.insert(history);
    }

    @Override
    public History update(History history) {
        if (!historyRepository.existsById(history.getId())) {
            throw new RuntimeException("History with this id does not exist");
        }
        validateTranslations(history);
        return historyRepository.save(history);
    }

    @Override
    public boolean delete(String id) {
        try {
            History history = historyRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("History with this id does not exist"));

            historyRepository.delete(history);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Optional<EntityResponse> getHistory(String id, String language) {
        if (!historyRepository.existsById(id)) {
            throw new RuntimeException("History with this id does not exist");
        }

        return historyRepository.findById(id)
                .flatMap(history -> getTranslation(language, history));
    }

    @Override
    public Optional<History> getHistoryWithTranslations(String id) {
        return historyRepository.findById(id);
    }

    @Override
    public List<EntityResponse> getHistories(String language) {
        return historyRepository.findAll().stream()
                .map(history -> getTranslation(language, history))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

    @Override
    public List<History> getAllHistories() {
        return historyRepository.findAll();
    }

    @Override
    public long count() {
        return historyRepository.count();
    }

    private void validateTranslations(History request) {
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

    private Optional<EntityResponse> getTranslation(String language, History history) {
        return history.getTranslations().stream()
                .filter(t -> language.contains(t.getLanguageCode()))
                .findFirst()
                .map(translation -> EntityResponse.builder()
                        .id(history.getId())
                        .description(translation.getDescription())
                        .title(translation.getTitle())
                        .build());
    }
}
