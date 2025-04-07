package com.example.userauthbackend.service;

import com.example.entity.Farmer;
import com.example.userauthbackend.repository.FarmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FarmerService {

    @Autowired
    private FarmerRepository farmerRepository;

    public Farmer registerFarmer(Farmer farmer) {
        return farmerRepository.save(farmer);
    }

    public boolean isValidFarmer(String email, String password) {
        Farmer farmer = farmerRepository.findByEmailAndPassword(email, password);
        return farmer != null;
    }
}
