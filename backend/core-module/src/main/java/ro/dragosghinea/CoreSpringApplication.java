package ro.dragosghinea;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "ro.dragosghinea")
public class CoreSpringApplication {
    public static void main(String[] args) {
        SpringApplication.run(CoreSpringApplication.class, args);
    }
}