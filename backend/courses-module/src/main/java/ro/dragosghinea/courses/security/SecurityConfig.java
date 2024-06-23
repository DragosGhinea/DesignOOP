package ro.dragosghinea.courses.security;

import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTParser;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.oauth2.server.resource.web.authentication.BearerTokenAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import ro.dragosghinea.courses.exceptions.InvalidJWT;
import ro.dragosghinea.courses.exceptions.RejectedByAuthServerException;

import java.text.ParseException;
import java.time.Instant;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final JWTValidator jwtValidator;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
//                .cors(Customizer.withDefaults())
                .cors(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sessionManagement -> sessionManagement
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .oauth2ResourceServer((oauth2) -> oauth2
                        // https://github.com/spring-projects/spring-security/issues/10818
                        .withObjectPostProcessor(new ObjectPostProcessor<BearerTokenAuthenticationFilter>() {
                            @Override
                            public <O extends BearerTokenAuthenticationFilter> O postProcess(O object) {
                                object.setAuthenticationFailureHandler(customAuthenticationEntryPoint::commence);
                                return object;
                            }})
                        .jwt(jwt -> jwt
                                .decoder(jwtDecoder())
                                .jwtAuthenticationConverter(jwtAuthenticationConverter()))
                )
                ;

        return http.build();
    }

    // https://stackoverflow.com/questions/72921478/using-a-custom-jwt-decoder-in-spring-boot-resource-server
    @Bean
    public JwtDecoder jwtDecoder() {
        return (token) -> {
            try {
                JWT parsedJwt = JWTParser.parse(token);

                if (!jwtValidator.validateJwt(token)) {
                    throw new RejectedByAuthServerException("The token was rejected by the auth server");
                }

                Map<String, Object> headers = new LinkedHashMap<>(parsedJwt.getHeader().toJSONObject());
                Map<String, Object> claims = new LinkedHashMap<>(parsedJwt.getJWTClaimsSet().getClaims());

                if (claims.get(JwtClaimNames.IAT) instanceof Date iat) {
                    claims.put(JwtClaimNames.IAT, iat.toInstant());
                }
                else if (claims.get(JwtClaimNames.IAT) instanceof Long iat) {
                    claims.put(JwtClaimNames.IAT, Instant.ofEpochSecond(iat));
                }

                if (claims.get(JwtClaimNames.EXP) instanceof Date exp) {
                    claims.put(JwtClaimNames.EXP, exp.toInstant());
                }
                else if (claims.get(JwtClaimNames.EXP) instanceof Long exp) {
                    claims.put(JwtClaimNames.EXP, Instant.ofEpochSecond(exp));
                }

                return Jwt.withTokenValue(parsedJwt.getParsedString())
                        .headers(h -> h.putAll(headers))
                        .claims(c -> c.putAll(claims))
                        .build();
            }
            catch (ParseException e) {
                throw new InvalidJWT("The bearer token is not well formatted.");
            }
        };
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        grantedAuthoritiesConverter.setAuthoritiesClaimName("authorities");
        grantedAuthoritiesConverter.setAuthorityPrefix("");

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
        return jwtAuthenticationConverter;
    }

//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
//        configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type", "X-FETCH-WITHOUT-COMPONENTS"));
//        configuration.setAllowedMethods(List.of("GET","POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
}
