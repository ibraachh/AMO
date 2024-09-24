package com.amoGroup.amoGroup.services.chronology;

import com.amoGroup.amoGroup.entities.Chronology;
import com.amoGroup.amoGroup.entities.translations.Translation;
import com.amoGroup.amoGroup.repositories.ChronologyRepository;
import com.amoGroup.amoGroup.repositories.LanguageRepository;
import com.amoGroup.amoGroup.response.EntityResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ChronologyServiceImpl implements ChronologyService {

    @Autowired
    LanguageRepository languageRepository;

    @Autowired
    ChronologyRepository chronologyRepository;

    @Override
    public Chronology add(Chronology chronology) {
        validateTranslations(chronology);
        return chronologyRepository.insert(chronology);
    }

    @Override
    public Chronology update(Chronology chronology) {
        if (!chronologyRepository.existsById(chronology.getId())) {
            throw new RuntimeException("Chronology with this id does not exist");
        }
        validateTranslations(chronology);

        return chronologyRepository.save(chronology);
    }

    @Override
    public boolean delete(String id) {
        try {
            Chronology chronology = chronologyRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Chronology with this id does not exist"));

            chronologyRepository.delete(chronology);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<EntityResponse> getChronologies(String language) {
        return chronologyRepository.findAll().stream()
                .map(chronology -> getTranslation(language, chronology))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

    @Override
    public Optional<EntityResponse> getChronology(String id, String language) {
        if (!chronologyRepository.existsById(id)) {
            throw new RuntimeException("Entity not found with this id");
        }
        return chronologyRepository.findById(id)
                .flatMap(about -> getTranslation(language, about));
    }

    @Override
    public List<Chronology> getAllChronologies() {
        return chronologyRepository.findAll();
    }

    @Override
    public Optional<Chronology> getChronologyWithTranslations(String id) {
        return chronologyRepository.findById(id);
    }

    @Override
    public long count() {
        return chronologyRepository.count();
    }

    private void validateTranslations(Chronology request) {
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

    private Optional<EntityResponse> getTranslation(String language, Chronology chronology) {
        return chronology.getTranslations().stream()
                .filter(t -> language.contains(t.getLanguageCode()))
                .findFirst()
                .map(translation -> EntityResponse.builder()
                        .id(chronology.getId())
                        .description(translation.getDescription())
                        .title(translation.getTitle())
                        .build());
    }
}
