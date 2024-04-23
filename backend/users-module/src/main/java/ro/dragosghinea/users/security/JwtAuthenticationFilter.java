package ro.dragosghinea.users.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import ro.dragosghinea.users.controller.errors.ErrorDto;
import ro.dragosghinea.users.exceptions.RefreshTokenNotFound;
import ro.dragosghinea.users.model.dto.RefreshTokenDto;
import ro.dragosghinea.users.model.dto.UserDto;
import ro.dragosghinea.users.service.TokenService;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final TokenService tokenService;
    private final ObjectMapper objectMapper;

    private void processRefreshTokenNotFound(HttpServletRequest request, HttpServletResponse response, RefreshTokenNotFound refreshTokenNotFound) throws IOException {
        ErrorDto errorDto = ErrorDto.generate(refreshTokenNotFound.getMessage(), request.getRequestURI(), HttpStatus.UNAUTHORIZED);

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(objectMapper.writeValueAsString(errorDto));
        response.getWriter().flush();
        response.getWriter().close();
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        if (request.getServletPath().contains("/v1/auth")) {
            if (!request.getServletPath().contains("/v1/auth/logout")) {
                filterChain.doFilter(request, response);
                return;
            }
        }

        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response);
            return;
        }

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userId;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            if (request.getCookies() == null) {
                filterChain.doFilter(request, response);
                return;
            }

            Optional<Cookie> accessTokenCookie = Arrays.stream(request.getCookies()).filter(c -> "accessToken".equals(c.getName())).findFirst();
            if (accessTokenCookie.isEmpty()) {
                filterChain.doFilter(request, response);
                return;
            }

            jwt = accessTokenCookie.get().getValue();
        }
        else
            jwt = authHeader.substring(7);

        userId = jwtService.extractUsername(jwt);
        if (userId != null) {
            RefreshTokenDto refreshTokenDto;
            try {
                refreshTokenDto = tokenService.getRefreshToken(UUID.fromString(userId), true);
            } catch (RefreshTokenNotFound refreshTokenNotFound) {
                processRefreshTokenNotFound(request, response, refreshTokenNotFound);
                return;
            }

            UserDto userDetails = refreshTokenDto.getUser();

            boolean isTokenValid = tokenService.isAccessTokenValid(refreshTokenDto, jwt);

            if (isTokenValid) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}