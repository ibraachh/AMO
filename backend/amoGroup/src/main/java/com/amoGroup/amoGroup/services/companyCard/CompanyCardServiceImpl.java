package com.amoGroup.amoGroup.services.companyCard;

import com.amoGroup.amoGroup.entities.CompanyCard;
import com.amoGroup.amoGroup.entities.translations.Translation;
import com.amoGroup.amoGroup.repositories.CompanyCardRepository;
import com.amoGroup.amoGroup.repositories.LanguageRepository;
import com.amoGroup.amoGroup.response.CompanyCardResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Slf4j
public class CompanyCardServiceImpl implements CompanyCardService {

    @Autowired
    LanguageRepository languageRepository;

    @Autowired
    CompanyCardRepository companyCardRepository;

    @Override
    public CompanyCard add(CompanyCard companyCard) {
        validateTranslations(companyCard);
        return companyCardRepository.insert(companyCard);
    }

    @Override
    public CompanyCard update(CompanyCard companyCard) {
        if (!companyCardRepository.existsById(companyCard.getId())) {
            throw new RuntimeException("CompanyCard with this id does not exist");
        }
        validateTranslations(companyCard);

        return companyCardRepository.save(companyCard);
    }

    @Override
    public boolean delete(String id) {
        try {
            CompanyCard companyCard = companyCardRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("CompanyCard with this id does not exist"));

            companyCardRepository.delete(companyCard);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    @Override
    public List<CompanyCardResponse> getCompanyCards(String language) {
        return companyCardRepository.findAll().stream()
                .map(companyCard -> getTranslation(language, companyCard))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

    @Override
    public Optional<CompanyCardResponse> getCompanyCard(String id, String language) {
        if (!companyCardRepository.existsById(id)) {
            throw new RuntimeException("Entity not found with this id");
        }
        return companyCardRepository.findById(id)
                .flatMap(companyCard -> getTranslation(language, companyCard));
    }

    @Override
    public List<CompanyCard> getAllCompanyCards() {
        return companyCardRepository.findAll();
    }

    @Override
    public Optional<CompanyCard> getCompanyCardWithTranslations(String id) {
        return companyCardRepository.findById(id);
    }

    @Override
    public long count() {
        return companyCardRepository.count();
    }

    @Override
    public List<CompanyCardResponse> getAllCompanyCardsByCompany(String companyId, String language) {
        return companyCardRepository.findAllByCompanyId(companyId).stream()
                .map(companyCard -> getTranslation(language, companyCard))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

    @Override
    public List<CompanyCard> getAllCompanyCardsByCompany(String companyId) {
        return companyCardRepository.findAllByCompanyId(companyId);
    }

    @Override
    public void validateTranslations(CompanyCard request) {
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

    @Override
    public Optional<CompanyCardResponse> getTranslation(String language, CompanyCard companyCard) {
        return companyCard.getTranslations().stream()
                .filter(t -> language.contains(t.getLanguageCode()))
                .findFirst()
                .map(translation -> CompanyCardResponse.builder()
                        .id(companyCard.getId())
                        .category(companyCard.getCategory())
                        .description(translation.getDescription())
                        .title(translation.getTitle())
                        .build());
    }
}
