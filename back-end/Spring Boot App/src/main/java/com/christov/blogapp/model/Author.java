package com.christov.blogapp.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    private String imageUrl;

    @Column(nullable = false, unique = true)
    private String email;
    private String password;

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<BlogPost> posts = new HashSet<>();

    public Author() {}

    public Author(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public Author(String name, String email, String password, String imageUrl) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.imageUrl = imageUrl;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<BlogPost> getPosts() {
        return posts;
    }

    public void setPosts(Set<BlogPost> posts) {
        this.posts = posts;
    }
}
