package com.jwt.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jwt.Entity.DebitCard;

public interface DebitCardRepo extends JpaRepository<DebitCard, Integer> {

	public List<DebitCard> findByUsername(String username);

}
