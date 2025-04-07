package com.example.userauthbackend.dto;

public class LoginRequest {
    private String email;
    private String password;

    public LoginRequest() {}

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // ✅ Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {  // <-- Make sure this method exists
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
