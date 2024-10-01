package com.amoGroup.amoGroup.controller;

import com.amoGroup.amoGroup.response.MessageResponse;
import com.amoGroup.amoGroup.services.storage.StorageService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.logging.Logger;

@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@RequestMapping("/api/file")
public class FileController {

    Logger logger = Logger.getLogger(FileController.class.getName());

    @Autowired
    StorageService storageService;

    private static final String ATTACHMENT_FILENAME = "attachment; filename=\"";
    private static final String COULD_NOT_DETERMINE_FILE_TYPE = "Could not determine file type.";

    @PostMapping("/uploadFile")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam String fileName,
            Authentication authentication
    ) {
        try {
            fileName = System.currentTimeMillis() + "_" + fileName;
            logger.info(fileName);
            logger.info(file.toString());
            storageService.store(file, fileName);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new MessageResponse(HttpStatus.OK, fileName));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @GetMapping("/getFile/{fileName}")
    @ResponseBody
    public ResponseEntity<?> getFile(@PathVariable("fileName") String fileName, HttpServletRequest request) {
        try {
            Resource file = storageService.loadAsResource(fileName);
            if (file == null) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .build();
            }
            // Try to determine file's content type
            String contentType = null;
            try {
                contentType = request.getServletContext().getMimeType(file.getFile().getAbsolutePath());
            } catch (IOException ex) {
                Logger.getLogger(AuthController.class.getName()).info("Could not determine file type.");
                throw new RuntimeException(ex.getMessage());
            }

            // Fallback to the default content type if type could not be determined
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                    .body(file);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }
}
