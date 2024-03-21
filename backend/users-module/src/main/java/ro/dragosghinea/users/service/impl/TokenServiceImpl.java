package ro.dragosghinea.users.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.dragosghinea.users.exceptions.RefreshTokenNotFound;
import ro.dragosghinea.users.exceptions.UserNotFound;
import ro.dragosghinea.users.mapper.RefreshTokenMapper;
import ro.dragosghinea.users.model.RefreshToken;
import ro.dragosghinea.users.model.User;
import ro.dragosghinea.users.model.dto.RefreshTokenDto;
import ro.dragosghinea.users.repository.RefreshTokenRepository;
import ro.dragosghinea.users.repository.UserRepository;
import ro.dragosghinea.users.security.JwtService;
import ro.dragosghinea.users.service.TokenService;

import java.time.Instant;
import java.util.UUID;

/**
 * In this implementation, only a refresh token per user is allowed.
 * A single access token is allowed as well. When generating a new access token, the old one is invalidated.
 * The invalidation is done via the lastRefresh field of the refresh token.
 */
@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;
    private final RefreshTokenMapper refreshTokenMapper;

    @Override
    public boolean isAccessTokenValid(RefreshTokenDto refreshTokenDto, String accessToken) {
        Long issuedAt = jwtService.extractIssuedAt(accessToken).toInstant().getEpochSecond();

        return refreshTokenDto.getLastRefresh() <= issuedAt && !jwtService.isTokenExpired(accessToken);
    }

    @Override
    public RefreshTokenDto getRefreshToken(UUID userId, boolean includeUser) throws RefreshTokenNotFound {
        RefreshToken refreshToken = (includeUser?
                refreshTokenRepository.findByUserIdWithUser(userId) : refreshTokenRepository.findByUserId(userId))
                .orElseThrow(() -> new RefreshTokenNotFound("Refresh token not found for user with id " + userId));

        return refreshTokenMapper.toDto(refreshToken);
    }

    @Override
    public RefreshTokenDto getRefreshToken(String refreshToken, boolean includeUser) throws RefreshTokenNotFound {
        RefreshToken refreshTokenEntity = (includeUser?
                refreshTokenRepository.findByRefreshTokenWithUser(refreshToken) : refreshTokenRepository.findByRefreshToken(refreshToken))
                .orElseThrow(() -> new RefreshTokenNotFound("Refresh token not found"));

        return refreshTokenMapper.toDto(refreshTokenEntity);
    }

    @Transactional
    @Override
    public RefreshTokenDto createRefreshToken(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFound("User with id " + userId + " not found"));
        String refreshToken = jwtService.generateRefreshToken(user);
        RefreshToken newRefreshToken = RefreshToken.builder()
                .userId(userId)
                .refreshToken(refreshToken)
                .lastRefresh(Instant.now().getEpochSecond())
                .build();

        newRefreshToken = refreshTokenRepository.save(newRefreshToken);
        return refreshTokenMapper.toDto(newRefreshToken);
    }

    @Override
    public boolean deleteRefreshToken(UUID userId) {
        return refreshTokenRepository.deleteByUserId(userId);
    }

    @Transactional
    @Override
    public String generateAccessToken(RefreshTokenDto refreshTokenDto) {
        if (refreshTokenDto.getUser() == null) {
            throw new IllegalArgumentException("User must be set in the refresh token DTO");
        }

        RefreshToken refreshToken = refreshTokenMapper.toEntity(refreshTokenDto);

        refreshToken.setLastRefresh(Instant.now().getEpochSecond());
        refreshTokenRepository.save(refreshToken);

        return jwtService.generateAccessToken(refreshToken.getUser());
    }
}
