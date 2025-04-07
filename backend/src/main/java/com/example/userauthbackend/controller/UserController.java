package com.example.userauthbackend.controller;

import com.example.entity.Buyer;
import com.example.entity.Farmer;
import com.example.userauthbackend.service.BuyerService;
import com.example.userauthbackend.service.FarmerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.userauthbackend.dto.LoginRequest;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private FarmerService farmerService;

    @Autowired
    private BuyerService buyerService;

    @PostMapping("/register/farmer")
    public Farmer registerFarmer(@RequestBody Farmer farmer) {
        return farmerService.registerFarmer(farmer);
    }

    @PostMapping("/register/buyer")
    public Buyer registerBuyer(@RequestBody Buyer buyer) {
        return buyerService.registerBuyer(buyer);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();

        if (buyerService.isValidBuyer(email, password)) {
            return ResponseEntity.ok(Map.of("role", "buyer"));
        } else if (farmerService.isValidFarmer(email, password)) {
            return ResponseEntity.ok(Map.of("role", "farmer"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
