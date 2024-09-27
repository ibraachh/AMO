package com.amoGroup.amoGroup.services.about;

import com.amoGroup.amoGroup.entities.About;
import com.amoGroup.amoGroup.response.EntityResponse;

import java.util.List;
import java.util.Optional;

public interface AboutService {

    About add(About about);

    About update(About about);

    boolean delete(String id);

    List<EntityResponse> getAbouts(String language);

    Optional<EntityResponse> getAbout(String id, String language);

    List<About> getAllAbouts();

    Optional<About> getAboutWithTranslations(String id);

    long count();
}
