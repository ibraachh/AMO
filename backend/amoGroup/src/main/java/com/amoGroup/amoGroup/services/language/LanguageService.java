package com.amoGroup.amoGroup.services.language;

import com.amoGroup.amoGroup.entities.Language;

import java.util.List;
import java.util.Optional;

public interface LanguageService {
    Language addLanguage(Language language);

    Language updateLanguage(Language language);

    boolean deleteLanguage(String id);

    List<Language> getLanguages();

    Optional<Language> getLanguage(String id);

    Optional<Language> getLanguageByName(String name);

    Optional<Language> getLanguageByCode(String code);

    long count();
}
