package com.amoGroup.amoGroup.services.news;

import com.amoGroup.amoGroup.entities.News;
import com.amoGroup.amoGroup.entities.translations.Translation;
import com.amoGroup.amoGroup.repositories.LanguageRepository;
import com.amoGroup.amoGroup.repositories.NewsRepository;
import com.amoGroup.amoGroup.response.NewsResponse;
import com.amoGroup.amoGroup.services.storage.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Slf4j
public class NewsServiceImpl implements NewsService {

    @Autowired
    LanguageRepository languageRepository;

    @Autowired
    NewsRepository newsRepository;

    @Autowired
    StorageService storageService;

    @Override
    public News add(News news) {
        validateTranslations(news);
        return newsRepository.save(news);
    }

    @Override
    public News update(News news) {
        if (!newsRepository.existsById(news.getId())) {
            throw new RuntimeException("News with this id does not exists");
        }
        validateTranslations(news);
        return newsRepository.save(news);
    }

    @Override
    public boolean delete(String id) {
        try {
            News news = newsRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("News with this id does not exists"));
            if (news.getImage() != null) {
                storageService.deleteExistingImages(news.getImage());
            }
            newsRepository.delete(news);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    @Override
    public Optional<NewsResponse> get(String id, String language) {
        if (!newsRepository.existsById(id)) {
            throw new RuntimeException("Entity not found with this id");
        }
        return newsRepository.findById(id)
                .flatMap(news -> getTranslation(language, news));
    }

    @Override
    public Optional<News> getNewsWithTranslations(String id) {
        return newsRepository.findById(id);
    }

    @Override
    public List<NewsResponse> list(String language) {
        return newsRepository.findAll().stream()
                .map(news -> getTranslation(language, news))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

    @Override
    public List<News> listAll() {
        return newsRepository.findAll();
    }

    @Override
    public long count() {
        return newsRepository.count();
    }

    private void validateTranslations(News request) {
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

    private Optional<NewsResponse> getTranslation(String language, News news) {
        return news.getTranslations().stream()
                .filter(t -> language.contains(t.getLanguageCode()))
                .findFirst()
                .map(translation -> NewsResponse.builder()
                        .id(news.getId())
                        .image(news.getImage())
                        .description(translation.getDescription())
                        .title(translation.getTitle())
                        .build());
    }

}
