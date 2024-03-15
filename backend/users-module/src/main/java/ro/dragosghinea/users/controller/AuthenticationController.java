package ro.dragosghinea.users.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import ro.dragosghinea.users.model.dto.OAuth2UserRequestDTO;

import java.time.Duration;
import java.time.Instant;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final ClientRegistrationRepository clientRegistrationRepository;
    private final DefaultOAuth2UserService oauth2UserService = new DefaultOAuth2UserService();;

    @PostMapping("/login")
    public void login(@RequestBody OAuth2UserRequestDTO oAuth2UserRequestDTO) {
        String clientRegistrationId = oAuth2UserRequestDTO.getClientRegistrationId();
        String accessToken = oAuth2UserRequestDTO.getAccessToken();

        System.out.println("LOGIN: "+clientRegistrationId+" "+accessToken);
        ClientRegistration clientRegistration = clientRegistrationRepository.findByRegistrationId(clientRegistrationId);
        OAuth2AccessToken accessTokenOauth = new OAuth2AccessToken(
                OAuth2AccessToken.TokenType.BEARER,
                accessToken,
                Instant.now(),
                Instant.now().plus(Duration.ofHours(1)),
                clientRegistration.getScopes()
        );

        OAuth2UserRequest request = new OAuth2UserRequest(clientRegistration, accessTokenOauth);
        try {
            OAuth2User user = oauth2UserService.loadUser(request);
            System.out.println("USER: "+user);
        }catch(Exception e) {
            System.out.println("EXCEPTION: "+e);
        }
        System.out.println("TEST");
    }
}
