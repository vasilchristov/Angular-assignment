package com.christov.blogapp.controller;

import com.christov.blogapp.model.BlogPost;
import com.christov.blogapp.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/blogposts")
public class BlogPostController {

    private final BlogPostRepository blogPostRepository;

    @Autowired
    public BlogPostController(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    @GetMapping
    public List<BlogPost> getAllBlogPosts() {
        return blogPostRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getBlogPostById(@PathVariable Long id) {
        Optional<BlogPost> blogPost = blogPostRepository.findById(id);
        return blogPost.map(post -> ResponseEntity.ok(post))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PutMapping("/{id}")
    public ResponseEntity<BlogPost> updateBlogPost(@PathVariable Long id, @RequestBody BlogPost blogPostDetails) {
        BlogPost updatedBlogPost = blogPostRepository.findById(id)
                .map(blogPost -> {
                    blogPost.setTitle(blogPostDetails.getTitle());
                    blogPost.setContent(blogPostDetails.getContent());
                    blogPost.setImageUrl(blogPostDetails.getImageUrl());
                    return blogPostRepository.save(blogPost);
                }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "BlogPost not found with id " + id));

        return ResponseEntity.ok(updatedBlogPost);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBlogPost(@PathVariable Long id) {
        return blogPostRepository.findById(id)
                .map(blogPost -> {
                    blogPostRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "BlogPost not found with id " + id));
    }


    @CrossOrigin(origins = "http://localhost:4200/createBlog")
    @PostMapping
    public ResponseEntity<BlogPost> createBlogPost(@RequestBody BlogPost blogPost) {

        if (blogPost.getTitle() == null || blogPost.getContent() == null || blogPost.getImageUrl() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        BlogPost savedBlogPost = blogPostRepository.save(blogPost);
        return new ResponseEntity<>(savedBlogPost, HttpStatus.CREATED);
    }

}
