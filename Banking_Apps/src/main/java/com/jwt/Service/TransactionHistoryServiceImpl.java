package com.jwt.Service;

import com.jwt.Entity.Transactions;
import com.jwt.Repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionHistoryServiceImpl {

    @Autowired
    public TransactionRepository transactionRepository;

    public List<Transactions> viewAll(){
        return transactionRepository.findAll();
    }

    public List<Transactions> viewByUsername(String senderid){
        return transactionRepository.findBySenderid(senderid);
    }
}
