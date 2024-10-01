package com.amoGroup.amoGroup.patch;

import org.springframework.stereotype.Component;

import java.lang.reflect.Field;

@Component
public class Patcher {

    public <T> void patcher(T existing, T incomplete) throws IllegalAccessException {
        Class<?> classes = existing.getClass();
        Field[] internFields = classes.getDeclaredFields();
        for (Field field : internFields) {
            field.setAccessible(true);

            Object value = field.get(incomplete);
            if (value != null) {
                field.set(existing, value);
            }
            field.setAccessible(false);
        }
    }
}
