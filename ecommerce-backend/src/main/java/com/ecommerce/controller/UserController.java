package com.ecommerce.controller;

import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.OrderRequest;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.User;
import com.ecommerce.service.AuthService;
import com.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private AuthService authService;

    @Autowired
    private OrderService orderService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getUserProfile() {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = authService.getUserByEmail(email);

        Map<String, Object> profileData = new HashMap<>();
        profileData.put("id", user.getId());
        profileData.put("name", user.getName());
        profileData.put("email", user.getEmail());
        profileData.put("role", user.getRole());

        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>(true, "User profile retrieved successfully", profileData)
        );
    }

    @PostMapping("/orders")
    public ResponseEntity<ApiResponse<Order>> createOrder(@RequestBody OrderRequest request) {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Order order = orderService.createOrder(email, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new ApiResponse<>(true, "Order created successfully", order)
        );
    }

    @GetMapping("/orders")
    public ResponseEntity<ApiResponse<List<Order>>> getUserOrders() {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Order> orders = orderService.getUserOrders(email);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>(true, "Orders retrieved successfully", orders)
        );
    }
}
