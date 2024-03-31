package com.christov.blogapp.controller;

import com.christov.blogapp.dto.AuthorDto;
import com.christov.blogapp.dto.BlogPostDto;
import com.christov.blogapp.model.Author;
import com.christov.blogapp.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    private final AuthorRepository authorRepository;

    public AuthorController(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @GetMapping
    public List<AuthorDto> getAllAuthors() {
        List<Author> authorsList = authorRepository.findAll();
        List<AuthorDto> auhorDTOs = authorsList.stream()
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

    public AuthorDto convertToAuthorDto(Author author) {
        AuthorDto authorDto = new AuthorDto();
        authorDto.setId(author.getId());
        authorDto.setName(author.getName());
        authorDto.setEmail(author.getEmail());
        authorDto.setImageUrl(author.getImageUrl());
        return authorDto;
    }
}
