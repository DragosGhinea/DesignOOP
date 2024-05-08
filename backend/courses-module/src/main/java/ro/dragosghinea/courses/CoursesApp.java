package ro.dragosghinea.courses;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication
@EnableMethodSecurity
public class CoursesApp {
    public static void main(String[] args) {
        SpringApplication.run(CoursesApp.class, args);
    }
}