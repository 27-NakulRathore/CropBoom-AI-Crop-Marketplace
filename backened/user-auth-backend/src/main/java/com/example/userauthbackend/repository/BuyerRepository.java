package com.example.userauthbackend.repository;

import com.example.entity.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuyerRepository extends JpaRepository<Buyer, Long> {
    Buyer findByEmailAndPassword(String email, String password);
}
