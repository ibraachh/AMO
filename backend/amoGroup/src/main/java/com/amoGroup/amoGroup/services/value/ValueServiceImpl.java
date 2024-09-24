package com.amoGroup.amoGroup.services.value;

import com.amoGroup.amoGroup.entities.Value;
import com.amoGroup.amoGroup.entities.translations.Translation;
import com.amoGroup.amoGroup.repositories.LanguageRepository;
import com.amoGroup.amoGroup.repositories.ValueRepository;
import com.amoGroup.amoGroup.response.EntityResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Slf4j
public class ValueServiceImpl implements ValueService {

    @Autowired
    ValueRepository valueRepository;

    @Autowired
    LanguageRepository languageRepository;

    @Override
    public Value add(Value value) {
        validateTranslations(value);
        return valueRepository.insert(value);
    }

    @Override
    public Value update(Value value) {
        if (!valueRepository.existsById(value.getId())) {
            throw new RuntimeException("Value with this id does not exist");
        }
        validateTranslations(value);

        return valueRepository.save(value);
    }

    @Override
    public boolean delete(String id) {
        try {
            Value value = valueRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Value with this id does not exist"));

            valueRepository.delete(value);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    @Override
    public List<EntityResponse> getValues(String language) {
        return valueRepository.findAll().stream()
                .map(value -> getTranslation(language, value))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

    @Override
    public List<Value> getAllValues() {
        return valueRepository.findAll();
    }

    @Override
    public Optional<EntityResponse> getValue(String id, String language) {
        if (!valueRepository.existsById(id)) {
            throw new RuntimeException("Value with this id does not exist");
        }
        return valueRepository.findById(id)
                .flatMap(value -> getTranslation(language, value));
    }

    @Override
    public Optional<Value> getValueWithTranslations(String id) {
        return valueRepository.findById(id);
    }

    @Override
    public long count() {
        return valueRepository.count();
    }

    private void validateTranslations(Value request) {
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

    private Optional<EntityResponse> getTranslation(String language, Value value) {
        return value.getTranslations().stream()
                .filter(t -> language.contains(t.getLanguageCode()))
                .findFirst()
                .map(translation -> EntityResponse.builder()
                        .id(value.getId())
                        .description(translation.getDescription())
                        .title(translation.getTitle())
                        .build());
    }
}
