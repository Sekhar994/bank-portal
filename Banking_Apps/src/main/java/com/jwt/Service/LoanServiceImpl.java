package com.jwt.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwt.Entity.Loans;
import com.jwt.Entity.User;
import com.jwt.Repository.LoanRepository;
import com.jwt.Repository.UserRepo;

@Service
public class LoanServiceImpl implements LoanService {

	@Autowired
	private LoanRepository loanRepo;

	@Autowired
	private UserRepo userRepo;

	@Override
	public Loans applyLoan(Loans loan) {
		loan.setStatus("Pending");
		return loanRepo.save(loan);
	}

	@Override
	public List<Loans> getAllLoans() {
		return loanRepo.findAll();
	}

	@Override
	public List<Loans> getLoansByUser(String username) {
		return loanRepo.findByUsername(username);
	}

	@Override
	public Loans updateStatusLoans(Loans loan) {

		Loans ln = loanRepo.findById(loan.getId()).get();

		if ("Approved".equals(loan.getStatus())) {
			User user = userRepo.findById(loan.getUsername()).get();

			user.setBalance(String.valueOf(Long.parseLong(user.getBalance()) + Long.parseLong(loan.getAmount())));
			userRepo.save(user);

		}

		return loanRepo.save(loan);
	}

}
