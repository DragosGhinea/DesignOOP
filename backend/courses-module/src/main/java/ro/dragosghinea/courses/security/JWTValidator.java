package ro.dragosghinea.courses.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class JWTValidator {

    @Value("${auth_server_validation_endpoint}")
    private String AUTH_SERVER_VALIDATION_ENDPOINT;

    public boolean validateJwt(String jwt) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + jwt);
            HttpEntity<String> requestEntity = new HttpEntity<>(headers);

            ResponseEntity<Void> response = restTemplate.exchange(
                    AUTH_SERVER_VALIDATION_ENDPOINT,
                    HttpMethod.POST,
                    requestEntity,
                    Void.class
            );

            return response.getStatusCode() == HttpStatus.OK;
        }catch(Exception e) {
            return false;
        }
    }
}
