package com.jwt.controller;

import com.jwt.Entity.*;
import com.jwt.Repository.UserRepo;
import com.jwt.RequestDTO.DepositDTO;
import com.jwt.RequestDTO.TransactionRequestDTO;
import com.jwt.RequestDTO.UpdateUserDTO;
import com.jwt.ResponseDTO.BaseResponseDTO;
import com.jwt.ResponseDTO.TransactionResponseDTO;
import com.jwt.Service.*;
import com.jwt.user.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

	@Autowired
	UserRepo userRepo;

	@Autowired
	private TransactionHistoryServiceImpl transactionHistoryService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtil jwtTokenUtil;

	@Autowired
	private CustomUserService customUserService;

	@Autowired
	private CreditCardService creditCardService;

	@Autowired
	private DebitCardService debitCardService;

	@Autowired
	private ChequeService chequeService;

	@Autowired
	private LoanService loanService;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	private AuthenticationResponse authenticationResponse = new AuthenticationResponse();

	@Autowired
	private JwtUtil jwtUtil;

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUsername(), authenticationRequest.getPassword()));
		} catch (BadCredentialsException e) {
			throw new Exception("Incorrect username or password", e);
		}

		final UserDetails userDetails = customUserService.loadUserByUsername(authenticationRequest.getUsername());
//        System.out.println(authenticationRequest.getUsername());
		final String jwt = jwtTokenUtil.generateToken(userDetails);
		authenticationResponse.setJwt(jwt);
		authenticationResponse.setUser(userRepo.findById(authenticationRequest.getUsername()).get());
		return ResponseEntity.ok(authenticationResponse);
	}

	@PostMapping("/register")
	public ResponseEntity registerCustomers(@RequestBody User user) {
		return ResponseEntity.ok(userDetailsService.registerUser(user));
	}

	@GetMapping("/getuser")
	public ResponseEntity findCustomerByUsername() throws Exception {
		Object auth = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String username = ((UserDetails) auth).getUsername();
		return ResponseEntity.ok(userDetailsService.findUserDetails(username));
	}

	@PostMapping(value = "/transaction")
	public ResponseEntity<BaseResponseDTO<TransactionResponseDTO>> transaction(
			@Validated @RequestBody TransactionRequestDTO requestDTO) {

		BaseResponseDTO<TransactionResponseDTO> response = new BaseResponseDTO();
		TransactionResponseDTO responseDTO = userDetailsService.transaction(requestDTO);
		if (responseDTO.getCurrentBalance() == null) {
			response.setResponseCode("1");
			response.setResponseMessage(responseDTO.getMessage());
			response.setResponseBody(responseDTO);
			return new ResponseEntity<>(response, HttpStatus.CONFLICT);
		}
		response.setResponseCode("0");
		response.setResponseMessage(responseDTO.getMessage());
		response.setResponseBody(responseDTO);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping(value = "/deposit")
	public ResponseEntity<?> deposit(@RequestBody @Validated DepositDTO depositDTO) {
		BaseResponseDTO<TransactionResponseDTO> response = new BaseResponseDTO();
		TransactionResponseDTO responseDTO = userDetailsService.deposit(depositDTO);
		response.setResponseCode("0");
		response.setResponseMessage(responseDTO.getMessage());
		response.setResponseBody(responseDTO);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping(value = "/updateUser")
	public ResponseEntity<?> updateUser(@RequestBody @Validated UpdateUserDTO updateUserDTO) {
		BaseResponseDTO<User> response = new BaseResponseDTO();
		User responseDTO = userDetailsService.updateUser(updateUserDTO);
		response.setResponseCode("0");
		response.setResponseMessage("User Updated Successfully");
		response.setResponseBody(responseDTO);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping("/applyCreditCard")
	public ResponseEntity<?> applyCreditCard(@RequestBody CreditCard card) {
		return new ResponseEntity<>(creditCardService.saveCreditCard(card), HttpStatus.CREATED);
	}

	@GetMapping("/getCreditCard")
	public ResponseEntity<?> getCreditCardByUser(@Param("username") String username) {
		return new ResponseEntity<>(creditCardService.getCreditCardByUsername(username), HttpStatus.OK);
	}

	@PostMapping("/applyDeditCard")
	public ResponseEntity<?> applyDeditCard(@RequestBody DebitCard card) {
		return new ResponseEntity<>(debitCardService.saveDreditCard(card), HttpStatus.CREATED);
	}

	@GetMapping("/getDeditCard")
	public ResponseEntity<?> getDeditCardByUser(@Param("username") String username) {
		return new ResponseEntity<>(debitCardService.getDebitCardByUsername(username), HttpStatus.OK);
	}

	@PostMapping("/applyCheque")
	public ResponseEntity<?> applyCheque(@RequestBody Cheque ch) {
		return new ResponseEntity<>(chequeService.applyCheck(ch), HttpStatus.CREATED);
	}

	@GetMapping("/getCheque")
	public ResponseEntity<?> getChequeByUser(@Param("username") String username) {

		/*String token=request.getHeader("authorization ").substring(7);

		String un=jwtUtil.extractUsername(token);*/

		return new ResponseEntity<>(chequeService.getChequeByUsername(username), HttpStatus.OK);
	}

	@PostMapping("/applyLoan")
	public ResponseEntity<?> applyLoan(@RequestBody Loans loan) {
		return new ResponseEntity<>(loanService.applyLoan(loan), HttpStatus.CREATED);
	}

	@GetMapping("/getLoan")
	public ResponseEntity<?> getLoanByUser(@Param("username") String username) {
		return new ResponseEntity<>(loanService.getLoansByUser(username), HttpStatus.OK);
	}

	@GetMapping("/alltransaction")
	public ResponseEntity<?> viewAllTransaction(){
		return new ResponseEntity<>(transactionHistoryService.viewAll(), HttpStatus.OK);
	}

	@GetMapping("/alltransactionBySender/{sid}")
	public ResponseEntity<?> viewAllTransactionBySender(@PathVariable String sid){
		return new ResponseEntity<>(transactionHistoryService.viewByUsername(sid), HttpStatus.OK);
	}

	@GetMapping("/getAllCredit")
	public ResponseEntity<?> getAllCredit() {
		return new ResponseEntity<>(creditCardService.getAllCreditCard(), HttpStatus.OK);
	}
	
}
