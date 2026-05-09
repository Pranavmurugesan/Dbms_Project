package com.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    private Double totalAmount;
    private String status;
    private String customerName;
    private String customerPhone;
    private String customerAddress;
    private String customerPincode;
    private String paymentMethod;
}
