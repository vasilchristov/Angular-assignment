package com.christov.blogapp.controller;

import com.christov.blogapp.dto.AuthorDto;
import com.christov.blogapp.dto.BlogPostDto;
import com.christov.blogapp.model.Author;
import com.christov.blogapp.model.BlogPost;
import com.christov.blogapp.repository.AuthorRepository;
import com.christov.blogapp.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    private final AuthorRepository authorRepository;

    private final BlogPostRepository blogPostRepository;

    public AuthorController(AuthorRepository authorRepository, BlogPostRepository blogPostRepository) {
        this.authorRepository = authorRepository;
        this.blogPostRepository = blogPostRepository;
    }

    @GetMapping
    public List<AuthorDto> getAllAuthors() {
        List<Author> authorsList = authorRepository.findAll();
        List<AuthorDto> auhorDTOs = authorsList.stream()
                .filter(author -> null != author.getPosts() && !author.getPosts().isEmpty())
                .map(this::convertToAuthorDto)
                .collect(Collectors.toList());
        return auhorDTOs;
    }


    @GetMapping("/{id}")
    public AuthorDto getAuthorById(@PathVariable Long id) {
        Optional<Author> author = authorRepository.findById(id);
        AuthorDto authorDto = convertToAuthorDto(author.get());
        return authorDto;
    }

    @GetMapping("/byName/{name}")
    public AuthorDto getAuthorByName(@PathVariable String name) {
        Optional<Author> author = authorRepository.findByName(name);
        AuthorDto authorDto = convertToAuthorDto(author.get());
        return authorDto;
    }


    @PutMapping("/{id}")
    public AuthorDto updateAuthor(@PathVariable(value = "id") Long authorId, @RequestBody Author authorDetails) {

        Author author = authorRepository.findById(authorId).get();
        author.setName(authorDetails.getName());
        author.setEmail(authorDetails.getEmail());
        author.setImageUrl(authorDetails.getImageUrl());
        final Author updatedAuthor = authorRepository.save(author);

        AuthorDto authorDto = convertToAuthorDto(author);
        return authorDto;
    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAuthor(@PathVariable Long id) {
        Optional<Author> author = authorRepository.findById(id);
        if (!author.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        List<BlogPost> blogPosts = blogPostRepository.findByAuthor(author.get());
        blogPostRepository.deleteAll(blogPosts);

        authorRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }


    public AuthorDto convertToAuthorDto(Author author) {
        AuthorDto authorDto = new AuthorDto();
        authorDto.setId(author.getId());
        authorDto.setName(author.getName());
        authorDto.setEmail(author.getEmail());
        authorDto.setImageUrl(author.getImageUrl());
        return authorDto;
    }
}
