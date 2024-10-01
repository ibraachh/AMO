package com.amoGroup.amoGroup.services.mission;

import com.amoGroup.amoGroup.entities.Mission;
import com.amoGroup.amoGroup.response.EntityResponse;

import java.util.List;
import java.util.Optional;

public interface MissionService {

    Mission add(Mission mission);

    Mission update(Mission mission);

    boolean delete(String id);

    List<EntityResponse> getMissions(String language);

    List<Mission> getAllMissions();

    Optional<EntityResponse> getMission(String id, String language);

    Optional<Mission> getMissionWithTranslations(String id);

    long count();
}
