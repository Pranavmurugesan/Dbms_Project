package com.ecommerce.service;

import com.ecommerce.dto.AnalyticsResponse;
import com.ecommerce.dto.OrderRequest;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.User;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public Order createOrder(String email, OrderRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setTotalAmount(request.getTotalAmount());
        order.setStatus(Order.OrderStatus.PENDING);
        order.setCustomerName(request.getCustomerName());
        order.setCustomerPhone(request.getCustomerPhone());
        order.setCustomerAddress(request.getCustomerAddress());
        order.setCustomerPincode(request.getCustomerPincode());
        order.setPaymentMethod(request.getPaymentMethod());

        return orderRepository.save(order);
    }

    public List<Order> getUserOrders(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return orderRepository.findByUserId(user.getId());
    }

    public AnalyticsResponse getAnalytics() {
        Long totalProducts = (long) productRepository.findAll().size();
        Long totalUsers = (long) userRepository.findAll().size();
        Long totalOrders = (long) orderRepository.findAll().size();
        Double totalSales = orderRepository.getTotalSales();

        return new AnalyticsResponse(totalProducts, totalUsers, totalOrders, totalSales != null ? totalSales : 0.0);
    }
}
