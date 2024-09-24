package com.amoGroup.amoGroup.services.career;

import com.amoGroup.amoGroup.entities.Career;
import com.amoGroup.amoGroup.entities.translations.Translation;
import com.amoGroup.amoGroup.repositories.CareerRepository;
import com.amoGroup.amoGroup.repositories.LanguageRepository;
import com.amoGroup.amoGroup.response.CareerResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CareerServiceImpl implements CareerService {

    @Autowired
    LanguageRepository languageRepository;

    @Autowired
    CareerRepository careerRepository;

    @Override
    public Career add(Career career) {
        validateTranslations(career);
        return careerRepository.insert(career);
    }

    @Override
    public Career update(Career career) {
        if (!careerRepository.existsById(career.getId())) {
            throw new RuntimeException("Career with this id does not exist");
        }
        validateTranslations(career);

        return careerRepository.save(career);

    }

    @Override
    public boolean delete(String id) {
        try {
            Career career = careerRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("About with this id does not exist"));

            careerRepository.delete(career);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<CareerResponse> getCareers(String language) {
        return careerRepository.findAll().stream()
                .map(career -> getTranslation(language, career))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

    @Override
    public Optional<CareerResponse> getCareer(String id, String language) {
        if (!careerRepository.existsById(id)) {
            throw new RuntimeException("Entity not found with this id");
        }
        return careerRepository.findById(id)
                .flatMap(about -> getTranslation(language, about));
    }

    @Override
    public List<Career> getAllCareers() {
        return careerRepository.findAll();
    }

    @Override
    public Optional<Career> getCareerWithTranslations(String id) {
        return careerRepository.findById(id);
    }

    @Override
    public long count() {
        return careerRepository.count();
    }

    private void validateTranslations(Career request) {
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

    private Optional<CareerResponse> getTranslation(String language, Career career) {
        return career.getTranslations().stream()
                .filter(t -> language.contains(t.getLanguageCode()))
                .findFirst()
                .map(translation -> CareerResponse.builder()
                        .id(career.getId())
                        .date(career.getDate())
                        .description(translation.getDescription())
                        .title(translation.getTitle())
                        .build());
    }
}
