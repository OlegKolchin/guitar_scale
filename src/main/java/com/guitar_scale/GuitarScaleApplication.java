package com.guitar_scale;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.awt.*;
import java.net.URI;

@SpringBootApplication
public class GuitarScaleApplication {

    public static void main(String[] args) {
        SpringApplication.run(GuitarScaleApplication.class, args);
    }

//    @Bean
//    public CommandLineRunner run() {
//        return args -> {
//            try {
//                if (Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
//                    Desktop.getDesktop().browse(new URI("http://localhost:8080"));
//                }
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        };
//    }

}
