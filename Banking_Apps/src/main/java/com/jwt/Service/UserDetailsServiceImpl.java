package com.jwt.Service;


import com.jwt.Entity.Transactions;
import com.jwt.Entity.User;
import com.jwt.Repository.TransactionRepository;
import com.jwt.Repository.UserRepo;
import com.jwt.RequestDTO.DepositDTO;
import com.jwt.RequestDTO.TransactionHistoryDTO;
import com.jwt.RequestDTO.TransactionRequestDTO;
import com.jwt.RequestDTO.UpdateUserDTO;
import com.jwt.ResponseDTO.TransactionResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserDetailsServiceImpl {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private TransactionRepository transactionRepo;

    public User registerUser(User user) {
        user.setBalance("0");
        return userRepo.save(user);
    }

    public User findUserDetails(String username) throws Exception {
        if (userRepo.findById(username)==null) {
            throw new Exception("Employer Not Found with username " + username);
        }
        else {
            return userRepo.findById(username).orElse(null);
        }
    }

    @Transactional
    public TransactionResponseDTO transaction(TransactionRequestDTO requestDTO){


        TransactionResponseDTO responseDTO = new TransactionResponseDTO();

        Optional<User> receiver = userRepo.findById(requestDTO.getReceiverId());
        User sender = userRepo.findById(requestDTO.getSenderId()).get();

        if (receiver.isEmpty()) {
            responseDTO.setCurrentBalance(null);
            responseDTO.setMessage("The Receiver Account is incorrect");
            return responseDTO;
        } else if (Long.parseLong(sender.getBalance())<Long.parseLong(requestDTO.getAmount())){
            responseDTO.setCurrentBalance(null);
            responseDTO.setMessage("Your Current is inSufficient for this transaction.");
            return responseDTO;
        } else {
            User rec = receiver.get();
            rec.setBalance(String.valueOf(Long.parseLong( rec.getBalance())+Long.parseLong(requestDTO.getAmount())));
            userRepo.save(rec);
            sender.setBalance(String.valueOf(Long.parseLong( sender.getBalance())-Long.parseLong(requestDTO.getAmount())));
            userRepo.save(sender);

            Transactions transactions = new Transactions();

            transactions.setAmount(requestDTO.getAmount());
            transactions.setSenderid(requestDTO.getSenderId());
            transactions.setRecieverid(requestDTO.getReceiverId());
            transactions.setDate(LocalDate.now()+" "+ LocalTime.now());
            transactions.setModeOfTransfer("Transfer");

            transactionRepo.save(transactions);

            responseDTO.setCurrentBalance(sender.getBalance());
            responseDTO.setMessage("Transaction has been proceed successfully");
            return responseDTO;
        }

    }

    @Transactional
    public TransactionResponseDTO deposit(DepositDTO depositDTO){
        TransactionResponseDTO responseDTO = new TransactionResponseDTO();
        User sender = userRepo.findById(depositDTO.getAccountNumber()).get();
        sender.setBalance(String.valueOf(Long.parseLong( sender.getBalance()) + Long.parseLong(depositDTO.getAmount())));
        userRepo.save(sender);

        Transactions transactions = new Transactions();

        transactions.setAmount(depositDTO.getAmount());
        transactions.setSenderid(depositDTO.getAccountNumber());
        transactions.setRecieverid(depositDTO.getAccountNumber());
        transactions.setDate(LocalDate.now()+" "+ LocalTime.now());
        transactions.setModeOfTransfer("Self Deposit");

        transactionRepo.save(transactions);

        responseDTO.setCurrentBalance(sender.getBalance());
        responseDTO.setMessage("Transaction has been proceed successfully");
        return responseDTO;

    }

    @Transactional
    public User updateUser(UpdateUserDTO updateUserDTO){
        User user = userRepo.findById(updateUserDTO.getUsername()).get();
        user.setFirstName(updateUserDTO.getFirstName());
        user.setLastName(updateUserDTO.getLastName());
        user.setFatherName(updateUserDTO.getFatherName());
        user.setMotherName(updateUserDTO.getMotherName());
        user.setPhoneNumber(updateUserDTO.getPhoneNumber());
        user.setDateOfBirth(updateUserDTO.getDateOfBirth());
        user.setSex(updateUserDTO.getSex());
        user.setAdhaarCard(updateUserDTO.getAdhaarCard());
        user.setPanCard(updateUserDTO.getPanCard());
        user.setAddressLine1(updateUserDTO.getAddressLine1());
        user.setAddressLine2(updateUserDTO.getAddressLine2());

        userRepo.save(user);
        return user;
    }

   public List<Transactions> viewAll(){
        return transactionRepo.findAll();
   }
}
