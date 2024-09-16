package com.amoGroup.amoGroup.services.storage;

import com.amoGroup.amoGroup.exceptions.StorageException;
import com.amoGroup.amoGroup.properties.StorageProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Stream;

/**
 * @author cihan
 */
@Service
@EnableConfigurationProperties(StorageProperties.class)
public class FileSystemStorageService implements StorageService {

    private final Path rootLocation;

    private static final String FAILED_TO_STORE_FILE = "Failed to store file.";
    private static final String CANNOT_STORE_FILE_OUTSIDE_CURRENT_DIRECTO = "Cannot store file outside current directory.";
    private static final String FAILED_TO_STORE_EMPTY_FILE = "Failed to store empty file.";

    @Autowired
    public FileSystemStorageService(StorageProperties properties) {
        this.rootLocation = Paths.get(properties.getLocation());
    }

    @Override
    public void store(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new StorageException(FAILED_TO_STORE_EMPTY_FILE);
            }
            Path destinationFile = this.rootLocation.resolve(
                            Paths.get(file.getOriginalFilename()))
                    .normalize().toAbsolutePath();
            if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                // This is a security check
                throw new StorageException(
                        CANNOT_STORE_FILE_OUTSIDE_CURRENT_DIRECTO);
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile,
                        StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e) {
            throw new StorageException(FAILED_TO_STORE_FILE, e);
        }
    }

    @Override
    public void store(MultipartFile file, String fileName) {
        try {
            if (file.isEmpty()) {
                throw new StorageException(FAILED_TO_STORE_EMPTY_FILE);
            }
            Path destinationFile = this.rootLocation.resolve(
                            Paths.get(fileName))
                    .normalize().toAbsolutePath();
            if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                // This is a security check
                throw new StorageException(
                        CANNOT_STORE_FILE_OUTSIDE_CURRENT_DIRECTO);
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile,
                        StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e) {
            throw new StorageException(FAILED_TO_STORE_FILE, e);
        }
    }

    @Override
    public void store(InputStream inputStream, String fileName) {
        try {
            if (inputStream == null) {
                throw new StorageException(FAILED_TO_STORE_EMPTY_FILE);
            }
            Path destinationFile = this.rootLocation.resolve(
                            Paths.get(fileName))
                    .normalize().toAbsolutePath();
            if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                // This is a security check
                throw new StorageException(
                        CANNOT_STORE_FILE_OUTSIDE_CURRENT_DIRECTO);
            }
            Files.copy(inputStream, destinationFile,
                    StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new StorageException(FAILED_TO_STORE_FILE, e);
        }
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize);
        } catch (IOException e) {
            throw new StorageException("Failed to read stored files", e);
        }

    }

    @Override
    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                Logger.getLogger("FileSystemStorage").info("Could not read file: " + filename);
                throw new RuntimeException("Could not read file, or file doesn't exits " + filename);
            }
        } catch (MalformedURLException e) {
            Logger.getLogger("FileSystemStorage").info("Could not read file: " + filename);
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    @Override
    public void init() {
        try {
            Logger.getLogger("Storage").log(Level.SEVERE, "File root location: {0}", rootLocation);
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new StorageException("Could not initialize storage", e);
        }
    }

    @Override
    public boolean exists(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            return resource.exists() && resource.isReadable();
        } catch (MalformedURLException ex) {
            return false;
        }
    }
}
