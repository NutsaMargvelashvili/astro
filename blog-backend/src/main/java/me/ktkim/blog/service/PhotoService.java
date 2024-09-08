package me.ktkim.blog.service;

import me.ktkim.blog.model.domain.User;
import me.ktkim.blog.model.dto.PhotoDto;
import me.ktkim.blog.model.domain.Photo;
import me.ktkim.blog.repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PhotoService {

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private UserService userService;

    // Path where images will be saved
    private final String uploadDir = "/home/newuser/Desktop/spring-boot-react-blog-master/blog-backend/src/main/java/me/ktkim/blog/images";

    public PhotoDto savePhoto(String fileName, InputStream inputStream) {
        System.out.println("Saving photoooo");

        // Generate a unique file name to avoid collisions
        String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;
        Path filePath = Paths.get(uploadDir, uniqueFileName);

        // Save file to the local filesystem
        try {
            Files.createDirectories(filePath.getParent()); // Create directories if they don't exist
            Files.copy(inputStream, filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }

        // Construct the file URL or path (adjust as needed for your application)
        String fileUrl = "/images/" + uniqueFileName;

        User user = new User();
        user.setId(2L); // Set the ID manually, or use an appropriate identifier
        user.setEmail("user1@mail.com");
        user.setUserName("user1");
        user.setCreatedBy("system");
        user.setCreatedDate(LocalDateTime.now()); // Or set a specific date if needed
        if (user == null) {
            throw new RuntimeException("User not found: ");
        }

        // Create and save a Photo entity
        Photo photo = new Photo();
        photo.setFileName(uniqueFileName);
        photo.setFileUrl(fileUrl);
        photo.setUploadedDate(LocalDateTime.now());
        photo.setUser(user); // Set the user who uploaded the photo

        photo = photoRepository.save(photo);

        return new PhotoDto(photo.getId(), photo.getFileName(), photo.getFileUrl());
    }

    public List<PhotoDto> getPhotoFeed() {
        // Fetch photos from the repository and convert to PhotoDto
        return photoRepository.findAll().stream()
                .map(photo -> new PhotoDto(photo.getId(), photo.getFileName(), photo.getFileUrl()))
                .collect(Collectors.toList());
    }

    public PhotoDto getPhotoById(Long id) {
        // Fetch the photo by ID from the repository
        Optional<Photo> photoOptional = photoRepository.findById(id);
        if (photoOptional.isPresent()) {
            Photo photo = photoOptional.get();
            return new PhotoDto(photo.getId(), photo.getFileName(), photo.getFileUrl());
        } else {
            return null; // or throw an exception if preferred
        }
    }
}
