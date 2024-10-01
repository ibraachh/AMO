package com.amoGroup.amoGroup.services.about;

import com.amoGroup.amoGroup.entities.About;
import com.amoGroup.amoGroup.entities.translations.Translation;
import com.amoGroup.amoGroup.repositories.AboutRepository;
import com.amoGroup.amoGroup.repositories.LanguageRepository;
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
public class AboutServiceImpl implements AboutService {

    @Autowired
    LanguageRepository languageRepository;

    @Autowired
    AboutRepository aboutRepository;

    @Override
    public About add(About about) {
        validateTranslations(about);
        if (!aboutRepository.findAll().isEmpty()) {
            throw new RuntimeException("About entity is already exists. Try to edit it");
        }
        return aboutRepository.insert(about);
    }

    @Override
    public About update(About about) {
        if (!aboutRepository.existsById(about.getId())) {
            throw new RuntimeException("About with this id does not exist");
        }
        validateTranslations(about);

        return aboutRepository.save(about);
    }

    @Override
    public boolean delete(String id) {
        try {
            About about = aboutRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("About with this id does not exist"));

            aboutRepository.delete(about);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    @Override
    public List<EntityResponse> getAbouts(String language) {
        return aboutRepository.findAll().stream()
                .map(about -> getTranslation(language, about))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

    @Override
    public Optional<EntityResponse> getAbout(String id, String language) {
        if (!aboutRepository.existsById(id)) {
            throw new RuntimeException("Entity not found with this id");
        }
        return aboutRepository.findById(id)
                .flatMap(about -> getTranslation(language, about));
    }

    @Override
    public List<About> getAllAbouts() {
        return aboutRepository.findAll();
    }

    @Override
    public Optional<About> getAboutWithTranslations(String id) {
        return aboutRepository.findById(id);
    }

    @Override
    public long count() {
        return aboutRepository.count();
    }

    private void validateTranslations(About request) {
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

    private Optional<EntityResponse> getTranslation(String language, About about) {
        return about.getTranslations().stream()
                .filter(t -> language.contains(t.getLanguageCode()))
                .findFirst()
                .map(translation -> EntityResponse.builder()
                        .id(about.getId())
                        .description(translation.getDescription())
                        .title(translation.getTitle())
                        .build());
    }

}
