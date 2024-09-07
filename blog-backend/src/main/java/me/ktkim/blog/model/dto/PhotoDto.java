package me.ktkim.blog.model.dto;

public class PhotoDto {

    private String fileName;
    private String fileUrl;

    // Constructors
    public PhotoDto() {}

    public PhotoDto(String fileName, String fileUrl) {
        System.out.println("here");
        this.fileName = fileName;
        this.fileUrl = fileUrl;
    }

    // Getters and Setters
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
