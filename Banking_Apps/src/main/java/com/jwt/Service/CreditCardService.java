package com.jwt.Service;

import com.jwt.Entity.CreditCard;

import java.util.List;

public interface CreditCardService {

	public CreditCard saveCreditCard(CreditCard creditCard);

	public List<CreditCard> getAllCreditCard();

	public List<CreditCard> getCreditCardByUsername(String username);

	public CreditCard updateStatus(int id, String status);

}
