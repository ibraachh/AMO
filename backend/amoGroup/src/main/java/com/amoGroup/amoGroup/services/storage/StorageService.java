package com.amoGroup.amoGroup.services.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.util.stream.Stream;

/**
 * @author cihan
 */
public interface StorageService {

    void init();

    void store(MultipartFile file);

    void store(MultipartFile file, String fileName);

    void store(InputStream inputStream, String fileName);

    Stream<Path> loadAll();

    boolean exists(String filename);

    Path load(String filename);

    Resource loadAsResource(String filename);

    void deleteAll();

    void deleteExistingImages(String basePath) throws IOException;

}
