package ro.dragosghinea.users.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import ro.dragosghinea.users.model.dto.OAuth2UserRequestDto;
import ro.dragosghinea.users.model.dto.RefreshAccessTokenPairDto;
import ro.dragosghinea.users.service.AuthenticationService;

import java.util.AbstractMap;
import java.util.Map;

@RestController
@RequestMapping("v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<RefreshAccessTokenPairDto> login(@RequestBody OAuth2UserRequestDto oAuth2UserRequestDTO) {
         return ResponseEntity.ok(authenticationService.authenticate(oAuth2UserRequestDTO));
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map.Entry<String, String>> refresh(@RequestBody Map<String, String> bodyParams) {
        String refreshToken = bodyParams.getOrDefault("refreshToken", null);
        if (refreshToken == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Refresh token not found");

        return ResponseEntity.ok(
                new AbstractMap.SimpleEntry<>(
                        "accessToken",
                        authenticationService.refreshAccessToken(refreshToken)
                )
        );
    }
}
