package com.ecommerce.config;

import com.ecommerce.entity.User;
import com.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create default admin account if it doesn't exist
        if (!userRepository.existsByEmail("admin@store.com")) {
            User admin = new User();
            admin.setName("Admin User");
            admin.setEmail("admin@store.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(User.Role.ROLE_ADMIN);

            userRepository.save(admin);
            System.out.println("Admin account created: admin@store.com / admin123");
        } else {
            System.out.println("Admin account already exists");
        }
    }
}
