package com.jwt.Repository;

import com.jwt.Entity.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transactions, Long> {

    List<Transactions> findBySenderid(String sender);
}
