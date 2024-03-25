package com.christov.blogapp.repository;

import com.christov.blogapp.model.Author;
import com.christov.blogapp.model.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    List<BlogPost> findByAuthor(Author author);
}
