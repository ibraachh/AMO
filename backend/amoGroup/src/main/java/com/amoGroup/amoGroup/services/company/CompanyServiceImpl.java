package com.amoGroup.amoGroup.services.company;

import com.amoGroup.amoGroup.entities.Company;
import com.amoGroup.amoGroup.entities.CompanyCard;
import com.amoGroup.amoGroup.entities.translations.Translation;
import com.amoGroup.amoGroup.repositories.CompanyCardRepository;
import com.amoGroup.amoGroup.repositories.CompanyRepository;
import com.amoGroup.amoGroup.repositories.LanguageRepository;
import com.amoGroup.amoGroup.response.CompanyCardResponse;
import com.amoGroup.amoGroup.response.CompanyResponse;
import com.amoGroup.amoGroup.services.companyCard.CompanyCardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    LanguageRepository languageRepository;

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    CompanyCardService companyCardService;

    @Autowired
    CompanyCardRepository companyCardRepository;

    @Override
    public Company add(Company company) {
        validateTranslations(company);
        return companyRepository.insert(company);
    }

    @Override
    public Company update(Company company) {
        if (!companyRepository.existsById(company.getId())) {
            throw new RuntimeException("Company with this id does not exist");
        }
        validateTranslations(company);

        return companyRepository.save(company);
    }

    @Override
    public boolean delete(String id) {
        try {
            Company company = companyRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Company with this id does not exist"));

            List<CompanyCard> cards = company.getCompanyCards();
            companyCardRepository.deleteAll(cards);
            companyRepository.delete(company);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    @Override
    public Company addCard(String companyId, CompanyCard companyCard) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found with given id"));
        if (company.getCompanyCards() == null) {
            company.setCompanyCards(new ArrayList<>());
        }
        companyCardService.add(companyCard);
        company.getCompanyCards().add(companyCard);
        return companyRepository.save(company);
    }

    @Override
    public Company deleteCard(String companyId, String cardId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found with given id"));
        CompanyCard companyCard = companyCardRepository.findById(cardId)
                .orElseThrow(() -> new RuntimeException("Company card not found with given id"));
        company.getCompanyCards().remove(companyCard);
        companyCardRepository.delete(companyCard);
        return companyRepository.save(company);
    }

    @Override
    public List<CompanyResponse> getCompanies(String language) {
        return companyRepository.findAll().stream()
                .map(company -> getTranslation(language, company))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

    @Override
    public Optional<CompanyResponse> getCompany(String id, String language) {
        if (!companyRepository.existsById(id)) {
            throw new RuntimeException("Entity not found with this id");
        }
        return companyRepository.findById(id)
                .flatMap(company -> getTranslation(language, company));
    }

    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    public Optional<Company> getCompanyWithTranslations(String id) {
        return companyRepository.findById(id);
    }

    @Override
    public long count() {
        return companyRepository.count();
    }

    private void validateTranslations(Company request) {
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

    private Optional<CompanyResponse> getTranslation(String language, Company company) {
        List<CompanyCardResponse> companyCardResponses;
        if (company.getCompanyCards() != null) {
            companyCardResponses = getCompanyCardTranslations(language, company.getCompanyCards());
        } else {
            companyCardResponses = new ArrayList<>();
        }

        return company.getTranslations().stream()
                .filter(t -> language.contains(t.getLanguageCode()))
                .findFirst()
                .map(translation -> CompanyResponse.builder()
                        .id(company.getId())
                        .description(translation.getDescription())
                        .title(translation.getTitle())
                        .companyCards(companyCardResponses)
                        .build());
    }

    private List<CompanyCardResponse> getCompanyCardTranslations(String language, List<CompanyCard> companyCards) {
        return companyCards.stream()
                .map(companyCard -> companyCardService.getTranslation(language, companyCard))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }
}
