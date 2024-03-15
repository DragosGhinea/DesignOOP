package ro.dragosghinea.users.security;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.authentication.OAuth2LoginAuthenticationProvider;
import org.springframework.security.oauth2.client.authentication.OAuth2LoginAuthenticationToken;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Override
    public Authentication authenticate(final Authentication authentication) throws AuthenticationException {
        final String name = authentication.getName();
        final String password = authentication.getCredentials().toString();
//        if (!"admin".equals(name) || !"system".equals(password)) {
//            return null;
//        }
//        OAuth2LoginAuthenticationProvider;
//        OAuth2LoginAuthenticationFilter
        System.out.println("AUTHENTICATE: "+authentication);
        return null;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        System.out.println("SUPPORTS? "+authentication.toString());
        return authentication.equals(OAuth2LoginAuthenticationToken.class);
//        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
