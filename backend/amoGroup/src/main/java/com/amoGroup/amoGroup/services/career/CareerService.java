package com.amoGroup.amoGroup.services.career;

import com.amoGroup.amoGroup.entities.Career;
import com.amoGroup.amoGroup.response.CareerResponse;

import java.util.List;
import java.util.Optional;

public interface CareerService {

    Career add(Career career);

    Career update(Career career);

    boolean delete(String id);

    List<CareerResponse> getCareers(String language);

    Optional<CareerResponse> getCareer(String id, String language);

    List<Career> getAllCareers();

    Optional<Career> getCareerWithTranslations(String id);

    long count();
}
