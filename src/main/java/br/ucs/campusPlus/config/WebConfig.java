package br.ucs.campusPlus.config; // Replace 'com.yourpackage' with your actual package name

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/api/**")               // só para seus endpoints REST
                .allowedOriginPatterns("*")         // allow ANY ngrok domain (ou use um pattern mais restrito)
                .allowedMethods("*")                // GET, POST, PUT, DELETE, etc.
                .allowedHeaders("*")                // todos os headers
                .allowCredentials(true);            // cookies/sessions
    }
}