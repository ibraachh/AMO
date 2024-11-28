package com.amoGroup.amoGroup.services.company;

import com.amoGroup.amoGroup.entities.Company;
import com.amoGroup.amoGroup.entities.CompanyCard;
import com.amoGroup.amoGroup.response.CompanyResponse;

import java.util.List;
import java.util.Optional;

public interface CompanyService {
    Company add(Company company);

    Company update(Company company);

    boolean delete(String id);

    Company addCard(String companyId, CompanyCard companyCard);

    Company deleteCard(String companyId, String cardId);

    List<CompanyResponse> getCompanies(String language);

    Optional<CompanyResponse> getCompany(String id, String language);

    List<Company> getAllCompanies();

    Optional<Company> getCompanyWithTranslations(String id);

    long count();

    Optional<Company> getCompanyByName(String name);

    CompanyResponse getCompanyByName(String name, String language);
}
