package com.ecommerce.controller;

import com.ecommerce.dto.AnalyticsResponse;
import com.ecommerce.dto.ApiResponse;
import com.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/analytics")
    public ResponseEntity<ApiResponse<AnalyticsResponse>> getAnalytics() {
        AnalyticsResponse analytics = orderService.getAnalytics();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>(true, "Analytics retrieved successfully", analytics)
        );
    }
}
