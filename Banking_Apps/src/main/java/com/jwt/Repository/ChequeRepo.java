package com.jwt.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jwt.Entity.Cheque;

public interface ChequeRepo extends JpaRepository<Cheque, Integer> {

	public List<Cheque> findByUsername(String username);
	
	
	
}
