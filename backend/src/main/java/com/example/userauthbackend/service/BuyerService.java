package com.example.userauthbackend.service;

import com.example.entity.Buyer;
import com.example.userauthbackend.repository.BuyerRepository; // ✅ Add this import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BuyerService {

    @Autowired
    private BuyerRepository buyerRepository;

    public Buyer registerBuyer(Buyer buyer) {
        // Save plain text password (NOT recommended for production)
        return buyerRepository.save(buyer);
    }

    public boolean isValidBuyer(String email, String password) {
        Buyer buyer = buyerRepository.findByEmailAndPassword(email, password);
        return buyer != null;
    }
}
