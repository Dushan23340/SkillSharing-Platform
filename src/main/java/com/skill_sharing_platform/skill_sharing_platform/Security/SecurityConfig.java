package com.skill_sharing_platform.skill_sharing_platform.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Disable CSRF
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() // ✅ Allow all requests without authentication
            )
            .formLogin(form -> form.disable()) // Disable login page
            .httpBasic(basic -> basic.disable()); // Disable basic auth

        return http.build();
    }
}


