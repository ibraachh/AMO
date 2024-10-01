package com.amoGroup.amoGroup.services.video;

import com.amoGroup.amoGroup.entities.Video;
import com.amoGroup.amoGroup.repositories.VideoRepository;
import com.amoGroup.amoGroup.services.storage.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@Slf4j
public class VideoServiceImpl implements VideoService {

    @Autowired
    VideoRepository videoRepository;

    @Autowired
    StorageService storageService;

    @Override
    public Video add(MultipartFile file, String fileName) {
        try {
            fileName = System.currentTimeMillis() + "_" + fileName;
            log.info(fileName);
            log.info(file.toString());
            storageService.store(file, fileName);
            Video video = new Video();
            video.setVideoUrl(fileName);
            return videoRepository.insert(video);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException("Error while saving video");
        }
    }

    @Override
    public boolean delete(String id) {
        try {
            Video video = videoRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Video not found with given id"));
            storageService.deleteExistingImages(video.getVideoUrl());
            videoRepository.delete(video);
            return true;
        } catch (Exception e) {
            log.error("Error deleting video : {}", e.getMessage());
            return false;
        }
    }

    @Override
    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    @Override
    public Video getVideo(String id) {
        return videoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Video not found with given id"));
    }

    @Override
    public Video getVideoByFileName(String fileName) {
        return videoRepository.findByVideoUrl(fileName)
                .orElseThrow(() -> new RuntimeException("Video not found with given file name"));
    }

    @Override
    public long count() {
        return videoRepository.count();
    }
}
