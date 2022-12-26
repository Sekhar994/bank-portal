package com.jwt.RequestDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionRequestDTO {

    private String senderId;
    private String receiverId;
    private String amount;

}
