package me.ktkim.blog.api;

import me.ktkim.blog.model.dto.PhotoDto;
import me.ktkim.blog.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/photos")
public class PhotoController {

    @Autowired
    private PhotoService photoService;

    @PostMapping("/upload")
    public ResponseEntity<PhotoDto> uploadPhoto(@RequestParam("file") MultipartFile file) {
        try {
            // Save the photo and get the photoDto
            PhotoDto photoDto = photoService.savePhoto(file.getOriginalFilename(), file.getInputStream());
            return new ResponseEntity<>(photoDto, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/feed")
    public ResponseEntity<List<PhotoDto>> getPhotoFeed() {
//        System.out.println("hereeeeeeeee");
//        // Implement this method to retrieve and return photos for the feed
//        // For now, it could return a placeholder or empty list
//        return new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK);
        // Fetch the photo feed from the service
        List<PhotoDto> photoFeed = photoService.getPhotoFeed();

        // Return the feed, or an empty list if no photos exist
        return new ResponseEntity<>(photoFeed, HttpStatus.OK);
    }
}
