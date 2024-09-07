package me.ktkim.blog.service;

import me.ktkim.blog.model.dto.PhotoDto;
import me.ktkim.blog.model.domain.Photo;
import me.ktkim.blog.repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PhotoService {

    @Autowired
    private PhotoRepository photoRepository;

    // Path where images will be saved
    private final String uploadDir = "/home/newuser/Desktop/spring-boot-react-blog-master/blog-backend/src/main/java/me/ktkim/blog/images";

    public PhotoDto savePhoto(String fileName, InputStream inputStream) {
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

        // Create and save a Photo entity
        Photo photo = new Photo();
        photo.setFileName(uniqueFileName);
        photo.setFileUrl(fileUrl);
        photo.setUploadedDate(LocalDateTime.now());
        // Assuming you have a method to set the user
        // photo.setUser(user);

        photoRepository.save(photo);

        return new PhotoDto(uniqueFileName, fileUrl);
    }

    public List<PhotoDto> getPhotoFeed() {
        // Fetch photos from the repository and convert to PhotoDto
        System.out.println("hiii");
        return photoRepository.findAll().stream()
                .map(photo -> new PhotoDto(photo.getFileName(), photo.getFileUrl()))
                .collect(Collectors.toList());
    }
}
