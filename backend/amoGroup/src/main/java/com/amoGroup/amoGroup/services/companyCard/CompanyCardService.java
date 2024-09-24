package com.amoGroup.amoGroup.services.companyCard;

import com.amoGroup.amoGroup.entities.CompanyCard;
import com.amoGroup.amoGroup.response.CompanyCardResponse;

import java.util.List;
import java.util.Optional;

public interface CompanyCardService {
    CompanyCard add(CompanyCard companyCard);

    CompanyCard update(CompanyCard companyCard);

    boolean delete(String id);

    List<CompanyCardResponse> getCompanyCards(String language);

    Optional<CompanyCardResponse> getCompanyCard(String id, String language);

    List<CompanyCard> getAllCompanyCards();

    Optional<CompanyCard> getCompanyCardWithTranslations(String id);

    long count();

    void validateTranslations(CompanyCard request);

    Optional<CompanyCardResponse> getTranslation(String language, CompanyCard companyCard);
}
