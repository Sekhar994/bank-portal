package com.jwt.Service;

import java.util.List;

import com.jwt.Entity.Loans;

public interface LoanService {

	public Loans applyLoan(Loans loan);

	public List<Loans> getAllLoans();

	public List<Loans> getLoansByUser(String username);

	public Loans updateStatusLoans(Loans loan);
}
