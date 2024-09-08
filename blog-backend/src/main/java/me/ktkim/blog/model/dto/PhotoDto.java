package me.ktkim.blog.model.dto;

public class PhotoDto {


    private Long id; // Assuming ID is of type Long, adjust if necessary
    private String fileName;
    private String fileUrl;

    // Constructors
    public PhotoDto() {}

    public PhotoDto(Long id, String fileName, String fileUrl) {
        this.id = id;
        this.fileName = fileName;
        this.fileUrl = fileUrl;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }
}
