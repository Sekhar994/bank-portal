package com.jwt.Repository;

import java.util.List;

import com.jwt.Entity.CreditCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CreditCardRepo extends JpaRepository<CreditCard, Integer> {

	public List<CreditCard> findByUsername(String username);

}
