package com.amoGroup.amoGroup.services.news;

import com.amoGroup.amoGroup.entities.News;
import com.amoGroup.amoGroup.response.NewsResponse;

import java.util.List;
import java.util.Optional;

public interface NewsService {
    News add(News news);

    News update(News news);

    boolean delete(String id);

    Optional<NewsResponse> get(String id, String language);

    Optional<News> getNewsWithTranslations(String id);

    List<NewsResponse> list(String language);

    List<News> listAll();

    long count();
}
