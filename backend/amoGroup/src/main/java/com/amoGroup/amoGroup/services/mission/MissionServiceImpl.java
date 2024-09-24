package com.amoGroup.amoGroup.services.mission;

import com.amoGroup.amoGroup.entities.Mission;
import com.amoGroup.amoGroup.entities.translations.Translation;
import com.amoGroup.amoGroup.repositories.LanguageRepository;
import com.amoGroup.amoGroup.repositories.MissionRepository;
import com.amoGroup.amoGroup.response.EntityResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class MissionServiceImpl implements MissionService {

    @Autowired
    MissionRepository missionRepository;

    @Autowired
    LanguageRepository languageRepository;

    @Override
    public Mission add(Mission mission) {
        validateTranslations(mission);
        return missionRepository.insert(mission);
    }

    @Override
    public Mission update(Mission mission) {
        if (!missionRepository.existsById(mission.getId())) {
            throw new RuntimeException("Mission with this id does not exist");
        }
        validateTranslations(mission);

        return missionRepository.save(mission);
    }

    @Override
    public boolean delete(String id) {
        try {
            Mission mission = missionRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Mission with this id does not exist"));

            missionRepository.delete(mission);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<EntityResponse> getMissions(String language) {
        return missionRepository.findAll().stream()
                .map(mission -> getTranslation(language, mission))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

    @Override
    public List<Mission> getAllMissions() {
        return missionRepository.findAll();
    }

    @Override
    public Optional<EntityResponse> getMission(String id, String language) {
        if (!missionRepository.existsById(id)) {
            throw new RuntimeException("Entity not found with this id");
        }
        return missionRepository.findById(id)
                .flatMap(mission -> getTranslation(language, mission));
    }

    @Override
    public Optional<Mission> getMissionWithTranslations(String id) {
        return missionRepository.findById(id);
    }

    @Override
    public long count() {
        return missionRepository.count();
    }

    private void validateTranslations(Mission request) {
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

    private Optional<EntityResponse> getTranslation(String language, Mission mission) {
        return mission.getTranslations().stream()
                .filter(t -> language.contains(t.getLanguageCode()))
                .findFirst()
                .map(translation -> EntityResponse.builder()
                        .id(mission.getId())
                        .description(translation.getDescription())
                        .title(translation.getTitle())
                        .build());
    }

}
