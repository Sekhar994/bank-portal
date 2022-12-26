package com.jwt.ResponseDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseResponseDTO<T> {

    private String responseCode;
    private String responseMessage;
    private T responseBody;

}
