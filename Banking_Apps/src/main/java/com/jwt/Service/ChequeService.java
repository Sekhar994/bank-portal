package com.jwt.Service;

import java.util.List;

import com.jwt.Entity.Cheque;

public interface ChequeService {

	public Cheque applyCheck(Cheque ch);

	public List<Cheque> getAllCheque();

	public List<Cheque> getChequeByUsername(String username);

	public Cheque updateStatus(int id, String status);

}
