package com.amoGroup.amoGroup.services.language;


import com.amoGroup.amoGroup.entities.Language;
import com.amoGroup.amoGroup.repositories.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LanguageServiceImpl implements LanguageService {

    @Autowired
    private LanguageRepository languageRepository;

    @Override
    public Language addLanguage(Language language) {
        if (languageRepository.existsByCode(language.getCode())) {
            throw new RuntimeException("Language with this code already exists");
        }
        if (languageRepository.existsByName(language.getName())) {
            throw new RuntimeException("Language with this name already exists");
        }
        return languageRepository.save(language);
    }

    @Override
    public Language updateLanguage(Language language) {
        if (!languageRepository.existsById(language.getId())) {
            throw new RuntimeException("Language with this id does not exist");
        }
        Optional<Language> l = languageRepository.findById(language.getId());
        if (l.isPresent()) {
            if (!l.get().getCode().equals(language.getCode()) && languageRepository.existsByCode(language.getCode())) {
                throw new RuntimeException("Language with this code already exists");
            }
            if (!l.get().getName().equals(language.getName()) && languageRepository.existsByName(language.getName())) {
                throw new RuntimeException("Language with this name already exists");
            }
        }
        return languageRepository.save(language);
    }

    @Override
    public boolean deleteLanguage(String id) {
        try {
            if (!languageRepository.existsById(id)) {
                throw new RuntimeException("Language with this id does not exist");
            }
            languageRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<Language> getLanguages() {
        return languageRepository.findAll();
    }

    @Override
    public Optional<Language> getLanguage(String id) {
        if (!languageRepository.existsById(id)) {
            throw new RuntimeException("Entity not found with this id");
        }
        return languageRepository.findById(id);
    }

    @Override
    public Optional<Language> getLanguageByName(String name) {
        if (!languageRepository.existsByName(name)) {
            throw new RuntimeException("Entity not found with this id");
        }
        return languageRepository.findByName(name);
    }

    @Override
    public Optional<Language> getLanguageByCode(String code) {
        if (!languageRepository.existsByCode(code)) {
            throw new RuntimeException("Entity not found with this id");
        }
        return languageRepository.findByCode(code);
    }

    @Override
    public long count() {
        return languageRepository.count();
    }
}
