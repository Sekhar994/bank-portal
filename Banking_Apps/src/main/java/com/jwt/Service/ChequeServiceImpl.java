package com.jwt.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwt.Entity.Cheque;
import com.jwt.Repository.ChequeRepo;
import com.jwt.Repository.UserRepo;

@Service
public class ChequeServiceImpl implements ChequeService {

	@Autowired
	private ChequeRepo chequeRepo;

	@Autowired
	private UserRepo userRepo;

	@Override
	public Cheque applyCheck(Cheque ch) {
		return chequeRepo.save(ch);
	}

	@Override
	public List<Cheque> getAllCheque() {
		return chequeRepo.findAll();
	}

	@Override
	public List<Cheque> getChequeByUsername(String username) {
		return chequeRepo.findByUsername(username);
	}

	@Override
	public Cheque updateStatus(int id, String status) {
		Cheque ch = chequeRepo.findById(id).get();
		ch.setStatus(status);
		return chequeRepo.save(ch);
	}

}
