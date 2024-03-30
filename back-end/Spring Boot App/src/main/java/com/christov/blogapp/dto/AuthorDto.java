package com.christov.blogapp.dto;


public class AuthorDto {
    private Long id;
    private String name;

    private String imageUrl;

    private String email;

    public AuthorDto(){}

    public AuthorDto(Long id, String name, String imageUrl, String email) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
