package com.jwt.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwt.Entity.DebitCard;
import com.jwt.Repository.DebitCardRepo;

@Service
public class DebitCardServiceImpl implements DebitCardService {

	@Autowired
	private DebitCardRepo debitCardRepo;

	@Override
	public DebitCard saveDreditCard(DebitCard debitCard) {
		return debitCardRepo.save(debitCard);
	}

	@Override
	public List<DebitCard> getAllDebitCard() {

		return debitCardRepo.findAll();
	}

	@Override
	public List<DebitCard> getDebitCardByUsername(String username) {
		return debitCardRepo.findByUsername(username);
	}

	@Override
	public DebitCard updateStatus(int id, String status) {
		DebitCard debitCard = debitCardRepo.findById(id).get();
		debitCard.setStatus(status);
		return debitCardRepo.save(debitCard);
	}

}
