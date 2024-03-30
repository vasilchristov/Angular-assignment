package com.christov.blogapp.dto;

public class BlogPostDto {

    private long id;

    private String title;

    private String imageUrl;

    private String content;

    private String authorName;

    public BlogPostDto() {
    }

    public BlogPostDto(long id, String title, String imageUrl, String content, String authorName) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.content = content;
        this.authorName = authorName;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }
}
