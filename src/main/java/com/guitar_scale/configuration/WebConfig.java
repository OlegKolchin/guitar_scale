package com.guitar_scale.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Or specify a more precise path
                .allowedOrigins("http://localhost:3000") // React's default port
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Methods you want to allow
                .allowCredentials(true);
    }
}
