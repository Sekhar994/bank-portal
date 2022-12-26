package com.jwt.Service;

import java.util.List;

import com.jwt.Entity.DebitCard;

public interface DebitCardService {

	public DebitCard saveDreditCard(DebitCard debitCard);

	public List<DebitCard> getAllDebitCard();

	public List<DebitCard> getDebitCardByUsername(String username);

	public DebitCard updateStatus(int id, String status);

}
