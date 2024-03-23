package com.christov.blogapp.controller;

import com.christov.blogapp.model.BlogPost;
import com.christov.blogapp.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/blogposts")
public class BlogPostController {

    private final BlogPostRepository blogPostRepository;

    @Autowired
    public BlogPostController(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    @PostMapping
    public ResponseEntity<BlogPost> createBlogPost(@RequestBody BlogPost blogPost) {

        if (blogPost.getTitle() == null || blogPost.getContent() == null || blogPost.getImageUrl() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        BlogPost savedBlogPost = blogPostRepository.save(blogPost);
        return new ResponseEntity<>(savedBlogPost, HttpStatus.CREATED);
    }

    // Additional endpoints
}
