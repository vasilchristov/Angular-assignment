package com.christov.blogapp.security;

import java.io.Serializable;

public class AuthenticationResponse implements Serializable {
    private final String jwt;
    private final String name;

    private final String email;

    public AuthenticationResponse(String jwt, String email, String name) {
        this.jwt = jwt;
        this.name = name;
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public String getJwt() {
        return jwt;
    }

    public String getName() {
        return name;
    }
}
