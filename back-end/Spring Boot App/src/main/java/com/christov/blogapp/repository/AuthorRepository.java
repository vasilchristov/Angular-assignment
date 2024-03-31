package com.christov.blogapp.repository;

import com.christov.blogapp.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthorRepository extends JpaRepository<Author, Long> {
    Optional<Author> findByEmail(String email);

    Optional<Author> findById(Long id);

    Optional<Author> findByName(String name);

    boolean existsByName(String name);
    boolean existsByEmail(String email);

}
