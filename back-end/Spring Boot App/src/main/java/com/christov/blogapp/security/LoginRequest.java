package com.christov.blogapp.security;


/**
 * DTO to capture the login request data
 */
public class LoginRequest {
    private String email;
    private String password;

    // Constructors, getters, and setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public LoginRequest() {

    }

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
