package me.ktkim.blog.repository;

import me.ktkim.blog.model.domain.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

    // Find a photo by its file name
    Optional<Photo> findByFileName(String fileName);

    // Find photos by user id
    Optional<List<Photo>> findByUserId(Long userId);
}
