package ro.dragosghinea.users.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import ro.dragosghinea.users.exceptions.ClientRegistrationNotFound;
import ro.dragosghinea.users.model.User;
import ro.dragosghinea.users.model.dto.OAuth2UserRequestDTO;
import ro.dragosghinea.users.model.dto.UserDto;
import ro.dragosghinea.users.security.LiteClientRegistration;
import ro.dragosghinea.users.security.OAuth2Fetcher;
import ro.dragosghinea.users.service.AuthenticationService;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final OAuth2Fetcher oAuth2Fetcher;
    private final DefaultOAuth2UserService oauth2UserService = new DefaultOAuth2UserService();
    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public void login(@RequestBody OAuth2UserRequestDTO oAuth2UserRequestDTO) {
         UserDto user = authenticationService.authenticate(oAuth2UserRequestDTO);
            System.out.println(user);

//        Map<String, Object> userAttrs = oAuth2Fetcher.getUserAttributes(liteClientRegistration, oAuth2UserRequestDTO.getAccessToken());
//        System.out.println(userAttrs.toString());
        System.out.println("TEST");
    }
}
