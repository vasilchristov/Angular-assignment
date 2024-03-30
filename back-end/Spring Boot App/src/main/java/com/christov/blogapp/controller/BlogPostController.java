package com.christov.blogapp.controller;

import com.christov.blogapp.dto.BlogPostDto;
import com.christov.blogapp.model.Author;
import com.christov.blogapp.model.BlogPost;
import com.christov.blogapp.repository.AuthorRepository;
import com.christov.blogapp.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/blogposts")
public class BlogPostController {

    private final BlogPostRepository blogPostRepository;

    private final AuthorRepository authorRepository;

    @Autowired
    public BlogPostController(BlogPostRepository blogPostRepository, AuthorRepository authorRepository) {
        this.blogPostRepository = blogPostRepository;
        this.authorRepository = authorRepository;
    }

    @GetMapping
    public List<BlogPostDto> getAllBlogPosts() {

        List<BlogPost> blogPosts = blogPostRepository.findAll();
        List<BlogPostDto> blogPostDTOs = blogPosts.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return blogPostDTOs;
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getBlogPostById(@PathVariable Long id) {
        Optional<BlogPost> blogPost = blogPostRepository.findById(id);
        return blogPost.map(post -> ResponseEntity.ok(post))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/posts/byUser")
    public ResponseEntity<List<BlogPostDto>> getBlogPostsByUserEmail(@RequestParam String email) {

        Optional<Author> author = authorRepository.findByEmail(email);
        if (!author.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        List<BlogPost> blogPosts = blogPostRepository.findByAuthor(author.get());
        List<BlogPostDto> blogPostDTOs = blogPosts.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(blogPostDTOs);
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

        Optional<Author> author = authorRepository.findByEmail(blogPost.getAuthorEmail());
        blogPost.setAuthor(author.get());

        BlogPost savedBlogPost = blogPostRepository.save(blogPost);
        return new ResponseEntity<>(savedBlogPost, HttpStatus.CREATED);
    }


    private BlogPostDto convertToDTO(BlogPost blogPost) {
        BlogPostDto dto = new BlogPostDto();
        dto.setId(blogPost.getId());
        dto.setTitle(blogPost.getTitle());
        dto.setImageUrl(blogPost.getImageUrl());
        dto.setContent(blogPost.getContent());
        dto.setAuthorName(blogPost.getAuthor().getName());
        return dto;
    }
}
