package com.jwt.Service;

import java.util.List;

import com.jwt.Entity.CreditCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwt.Repository.CreditCardRepo;
import com.jwt.Repository.UserRepo;

@Service
public class CreditCardServiceImpl implements CreditCardService {

	@Autowired
	public CreditCardRepo creditCardRepo;

	@Autowired
	public UserRepo userRepo;

	@Override
	public CreditCard saveCreditCard(CreditCard creditCard) {
		return creditCardRepo.save(creditCard);
	}

	@Override
	public List<CreditCard> getAllCreditCard() {
		return creditCardRepo.findAll();
	}

	@Override
	public List<CreditCard> getCreditCardByUsername(String username) {
		return creditCardRepo.findByUsername(username);
	}

	@Override
	public CreditCard updateStatus(int id, String status) {

		CreditCard card = creditCardRepo.findById(id).get();
		card.setStatus(status);
		return creditCardRepo.save(card);
	}

}
