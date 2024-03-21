package ro.dragosghinea.users.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;
import ro.dragosghinea.users.model.dto.OAuth2UserRequestDto;
import ro.dragosghinea.users.model.dto.UserDto;
import ro.dragosghinea.users.service.AuthenticationService;
import ro.dragosghinea.users.service.impl.OAuth2ToUserServiceCentralized;

@Component
@RequiredArgsConstructor
public class TokenAuthenticationProvider implements AuthenticationProvider {

    private final OAuth2ToUserServiceCentralized authenticationService;

    /**
     * Receive UsernamePasswordAuthenticationToken
     * where username is the provider
     * where password is the access_token
     */
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        final String provider = authentication.getName();
        final String token = authentication.getCredentials().toString();

        UserDto userDto = authenticationService.getUserFromOAuth2(OAuth2UserRequestDto.builder()
                .clientRegistrationId(provider)
                .accessToken(token)
                .build()
        );

        return new UsernamePasswordAuthenticationToken(userDto, null, userDto.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
