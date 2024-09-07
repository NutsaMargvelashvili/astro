package me.ktkim.blog.api;

import me.ktkim.blog.model.dto.PhotoDto;
import me.ktkim.blog.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
        // Fetch the photo feed from the service
        List<PhotoDto> photoFeed = photoService.getPhotoFeed();
        // Return the feed, or an empty list if no photos exist
        return new ResponseEntity<>(photoFeed, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhotoDto> getPhotoById(@PathVariable Long id) {
        // Fetch the photo by ID from the service
        PhotoDto photoDto = photoService.getPhotoById(id);
        if (photoDto != null) {
            return new ResponseEntity<>(photoDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
