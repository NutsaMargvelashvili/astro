package me.ktkim.blog.api;
import me.ktkim.blog.model.domain.Photo;
import me.ktkim.blog.model.domain.User;
import me.ktkim.blog.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import me.ktkim.blog.model.dto.PhotoDto;
import me.ktkim.blog.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/photos")
public class PhotoController {

    @Autowired
    private PhotoService photoService;

    private final UserService userService;

    @Autowired
    public PhotoController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/upload")
    public ResponseEntity<PhotoDto> uploadPhoto(@RequestParam("file") MultipartFile file) throws IOException {


        // Call the service method to save the photo
        PhotoDto photoDto = photoService.savePhoto(file.getOriginalFilename(), file.getInputStream());

        return ResponseEntity.ok(photoDto);
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
