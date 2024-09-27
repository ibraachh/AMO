package com.amoGroup.amoGroup.services.video;

import com.amoGroup.amoGroup.entities.Video;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VideoService {

    Video add(MultipartFile file, String fileName);

    boolean delete(String id);

    List<Video> getAllVideos();

    Video getVideo(String id);

    Video getVideoByFileName(String fileName);

    long count();
}
