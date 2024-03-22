package ro.dragosghinea.users.service;

import ro.dragosghinea.users.exceptions.RefreshTokenNotFound;
import ro.dragosghinea.users.model.dto.RefreshTokenDto;

import java.util.UUID;

public interface TokenService {

    boolean isAccessTokenValid(RefreshTokenDto refreshTokenDto, String accessToken);

    boolean isRefreshTokenValid(String refreshToken);

    RefreshTokenDto getRefreshToken(UUID userId, boolean includeUser) throws RefreshTokenNotFound;

    RefreshTokenDto getRefreshToken(String refreshToken, boolean includeUser) throws RefreshTokenNotFound;

    RefreshTokenDto createRefreshToken(UUID userId);

    boolean deleteRefreshToken(UUID userId);

    boolean deleteRefreshToken(String refreshToken);

    String generateAccessToken(RefreshTokenDto refreshTokenDto);
}
