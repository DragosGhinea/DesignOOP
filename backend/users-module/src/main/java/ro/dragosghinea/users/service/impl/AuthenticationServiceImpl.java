package ro.dragosghinea.users.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import ro.dragosghinea.users.model.dto.OAuth2UserRequestDto;
import ro.dragosghinea.users.model.dto.RefreshAccessTokenPairDto;
import ro.dragosghinea.users.model.dto.RefreshTokenDto;
import ro.dragosghinea.users.model.dto.UserDto;
import ro.dragosghinea.users.service.AuthenticationService;
import ro.dragosghinea.users.service.TokenService;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    @Override
    public RefreshAccessTokenPairDto authenticate(OAuth2UserRequestDto oAuth2UserRequestDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        oAuth2UserRequestDto.getClientRegistrationId(),
                        oAuth2UserRequestDto.getAccessToken()
                )
        );

        if (!(authentication.getPrincipal() instanceof UserDto userDto)) {
            throw new RuntimeException("AuthenticationManager returned an unexpected user type");
        }

        RefreshTokenDto refreshTokenDto = tokenService.createRefreshToken(userDto.getId());
        refreshTokenDto.setUser(userDto);

        String accessToken = tokenService.generateAccessToken(refreshTokenDto);

        return RefreshAccessTokenPairDto.builder()
                .refreshToken(refreshTokenDto.getRefreshToken())
                .accessToken(accessToken)
                .build();
    }

    @Override
    public String refreshAccessToken(String refreshToken) {
        return tokenService.generateAccessToken(tokenService.getRefreshToken(refreshToken, true));
    }
}
