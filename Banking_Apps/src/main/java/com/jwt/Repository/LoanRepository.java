package com.jwt.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jwt.Entity.Loans;

public interface LoanRepository extends JpaRepository<Loans, Integer> {

	public List<Loans> findByUsername(String username);

}
