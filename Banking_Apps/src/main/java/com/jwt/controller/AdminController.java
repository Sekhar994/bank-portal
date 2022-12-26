package com.jwt.controller;

import com.jwt.Entity.CreditCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jwt.Entity.Cheque;
import com.jwt.Entity.DebitCard;
import com.jwt.Entity.Loans;
import com.jwt.Service.ChequeService;
import com.jwt.Service.CreditCardService;
import com.jwt.Service.DebitCardService;
import com.jwt.Service.LoanService;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private CreditCardService creditCardService;

	@Autowired
	private DebitCardService debitCardService;

	@Autowired
	private LoanService loanService;

	@Autowired
	private ChequeService chequeService;

	@GetMapping("/getAllCredit")
	public ResponseEntity<?> getAllCredit() {
		return new ResponseEntity<>(creditCardService.getAllCreditCard(), HttpStatus.OK);
	}

	@GetMapping("/getAllDebit")
	public ResponseEntity<?> getAllDebit() {
		return new ResponseEntity<>(debitCardService.getAllDebitCard(), HttpStatus.OK);
	}

	@GetMapping("/getAllCheque")
	public ResponseEntity<?> getAllCheque() {
		return new ResponseEntity<>(chequeService.getAllCheque(), HttpStatus.OK);
	}

	@GetMapping("/getAllLoan")
	public ResponseEntity<?> getAllLoan() {
		return new ResponseEntity<>(loanService.getAllLoans(), HttpStatus.OK);
	}

	@PostMapping("/updateCreditStatus")
	public ResponseEntity<?> updateCreditCardStatus(@RequestBody CreditCard creditCard) {
		return new ResponseEntity<>(creditCardService.updateStatus(creditCard.getId(), creditCard.getStatus()),
				HttpStatus.OK);
	}

	@PostMapping("/updateDebitStatus")
	public ResponseEntity<?> updateDebitCardStatus(@RequestBody DebitCard debitCard) {
		return new ResponseEntity<>(debitCardService.updateStatus(debitCard.getId(), debitCard.getStatus()),
				HttpStatus.OK);
	}

	@PostMapping("/updateChequeStatus")
	public ResponseEntity<?> updateChequeStatus(@RequestBody Cheque cheque) {
		return new ResponseEntity<>(chequeService.updateStatus(cheque.getId(), cheque.getStatus()), HttpStatus.OK);
	}

	@PostMapping("/updateLoanStatus")
	public ResponseEntity<?> updateLoanStatus(@RequestBody Loans loan) {
		return new ResponseEntity<>(loanService.updateStatusLoans(loan), HttpStatus.OK);
	}

}
