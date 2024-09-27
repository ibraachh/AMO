package com.amoGroup.amoGroup.services.history;

import com.amoGroup.amoGroup.entities.History;
import com.amoGroup.amoGroup.response.EntityResponse;

import java.util.List;
import java.util.Optional;

public interface HistoryService {

    History add(History history);

    History update(History history);

    boolean delete(String id);

    Optional<EntityResponse> getHistory(String id, String language);

    Optional<History> getHistoryWithTranslations(String id);

    List<EntityResponse> getHistories(String language);

    List<History> getAllHistories();

    long count();
}
