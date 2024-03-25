package com.christov.blogapp.controller;

import com.christov.blogapp.model.Author;
import com.christov.blogapp.model.BlogPost;
import com.christov.blogapp.repository.BlogPostRepository;
import com.christov.blogapp.security.AuthenticationRequest;
import com.christov.blogapp.security.AuthenticationResponse;
import com.christov.blogapp.security.JwtUtil;
import com.christov.blogapp.repository.AuthorRepository;
import com.christov.blogapp.security.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private BlogPostRepository blogPostRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Author newUser) {

        // Check if the username/email already exists
        if (authorRepository.existsByName(newUser.getName())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Username is already taken!");
        }

        if (authorRepository.existsByEmail(newUser.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        // Create new user's account
        Author author = new Author();
        author.setName(newUser.getName());
        author.setEmail(newUser.getEmail());
        author.setPassword(passwordEncoder.encode(newUser.getPassword())); // Encode password
        author.setImageUrl(newUser.getImageUrl());

        authorRepository.save(author);

        // or will create with a DTO if needed
        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully!");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginRequest loginRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect email or password", e);
        }

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(loginRequest.getEmail());

        final String jwt = jwtTokenUtil.generateToken(userDetails);
        final String userName = userDetails.getUsername();

        return ResponseEntity.ok(new AuthenticationResponse(jwt, userName));
    }

    @GetMapping("/byUser")
    public ResponseEntity<List<BlogPost>> getPostsByUserEmail(@RequestParam String email) {
        Optional<Author> author = authorRepository.findByEmail(email);
        if (!author.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        List<BlogPost> posts = blogPostRepository.findByAuthor(author.get());
        return ResponseEntity.ok(posts);
    }
}

