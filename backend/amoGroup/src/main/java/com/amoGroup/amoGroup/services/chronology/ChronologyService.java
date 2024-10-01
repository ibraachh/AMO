package com.amoGroup.amoGroup.services.chronology;

import com.amoGroup.amoGroup.entities.Chronology;
import com.amoGroup.amoGroup.response.EntityResponse;

import java.util.List;
import java.util.Optional;

public interface ChronologyService {

    Chronology add(Chronology chronology);

    Chronology update(Chronology chronology);

    boolean delete(String id);

    List<EntityResponse> getChronologies(String language);

    Optional<EntityResponse> getChronology(String id, String language);

    List<Chronology> getAllChronologies();

    Optional<Chronology> getChronologyWithTranslations(String id);

    long count();
}
