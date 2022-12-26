package com.jwt.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Transactions {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long transactionId;
    private String senderid;
    private String recieverid;
    private String amount;
    private String date;
    private String modeOfTransfer;

    public Transactions(String senderId, String recieverId, String amount, String date, String mode) {
    }
}
