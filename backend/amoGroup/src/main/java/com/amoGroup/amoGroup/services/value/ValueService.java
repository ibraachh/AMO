package com.amoGroup.amoGroup.services.value;

import com.amoGroup.amoGroup.entities.Value;
import com.amoGroup.amoGroup.response.EntityResponse;

import java.util.List;
import java.util.Optional;

public interface ValueService {

    Value add(Value value);

    Value update(Value value);

    boolean delete(String id);

    List<EntityResponse> getValues(String language);

    List<Value> getAllValues();

    Optional<EntityResponse> getValue(String id, String language);

    Optional<Value> getValueWithTranslations(String id);

    long count();
}
