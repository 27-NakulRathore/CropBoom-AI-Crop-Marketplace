package com.example.userauthbackend.repository;

import com.example.entity.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FarmerRepository extends JpaRepository<Farmer, Long> {
    Farmer findByEmailAndPassword(String email, String password);
}
