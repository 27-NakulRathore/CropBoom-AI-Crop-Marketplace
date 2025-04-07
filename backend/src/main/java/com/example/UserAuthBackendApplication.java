package com.example;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.time.LocalDate; // Add this import

@SpringBootApplication
public class UserAuthBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserAuthBackendApplication.class, args);
        LocalDate today = LocalDate.now(); // Now it will work
        System.out.println("Today's date: " + today); // Example usage
    }
}