package com.christov.blogapp.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    private SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private String encodedSecretKey = Base64.getEncoder().encodeToString(key.getEncoded());

    public String generateToken(UserDetails userDetails) {
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        long expMillis = nowMillis + 1000 * 60 * 60 * 10;
        Date exp = new Date(expMillis);

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(key)
                .compact();
    }

    public String extractUsername(String token) {
        byte[] decodedKey = Base64.getDecoder().decode(encodedSecretKey);
        SecretKey originalKey = new SecretKeySpec(decodedKey, 0, decodedKey.length, "HmacSHA256");
        return Jwts.parser().setSigningKey(originalKey).parseClaimsJws(token).getBody().getSubject();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public Boolean isTokenExpired(String token) {
        byte[] decodedKey = Base64.getDecoder().decode(encodedSecretKey);
        SecretKey originalKey = new SecretKeySpec(decodedKey, 0, decodedKey.length, "HmacSHA256");
        final Date expiration = Jwts.parser().setSigningKey(originalKey).parseClaimsJws(token).getBody().getExpiration();
        return expiration.before(new Date());
    }
}
