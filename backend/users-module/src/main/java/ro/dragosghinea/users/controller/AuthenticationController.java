package ro.dragosghinea.users.controller;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ro.dragosghinea.users.model.dto.OAuth2UserRequestDto;
import ro.dragosghinea.users.model.dto.RefreshAccessTokenPairDto;
import ro.dragosghinea.users.service.AuthenticationService;

import java.time.Duration;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final Cache<String, String> refreshTokenCache = Caffeine.newBuilder()
            .expireAfterWrite(Duration.ofSeconds(3))
            .build();

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<RefreshAccessTokenPairDto> login(@RequestBody OAuth2UserRequestDto oAuth2UserRequestDTO) {
         return ResponseEntity.ok(authenticationService.authenticate(oAuth2UserRequestDTO));
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, String>> refresh(@RequestHeader(required = false, name = "refresh-token") String refreshTokenHeader, @RequestBody(required = false) Map<String, String> bodyParams) {
        String refreshToken;

        if (refreshTokenHeader != null)
            refreshToken = refreshTokenHeader;
        else {
            refreshToken = bodyParams == null? null : bodyParams.getOrDefault("refresh_token", null);
            if (refreshToken == null)
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Refresh token not found");
        }

        String cachedAccessToken = refreshTokenCache.getIfPresent(refreshToken);
        if (cachedAccessToken != null) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(
                    Map.of(
                            "access_token", cachedAccessToken,
                            "message", "Refreshing has a cooldown of 3 seconds. You are receiving the last generated token."
                    )
            );
        }

        String generatedAccessToken = authenticationService.refreshAccessToken(refreshToken);
        refreshTokenCache.put(refreshToken, generatedAccessToken);

        return ResponseEntity.ok(
                Map.of("access_token", generatedAccessToken)
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(Authentication authentication) {
        if (authentication == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");

        authenticationService.logout(UUID.fromString(authentication.getName()));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/validate-token")
    public ResponseEntity<Void> validateToken(Authentication authentication) {
        if (authentication == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");

        return ResponseEntity.ok().build();
    }
}
