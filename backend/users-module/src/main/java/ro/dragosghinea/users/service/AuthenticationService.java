package ro.dragosghinea.users.service;

import ro.dragosghinea.users.model.dto.OAuth2UserRequestDto;
import ro.dragosghinea.users.model.dto.RefreshAccessTokenPairDto;

public interface AuthenticationService {

    RefreshAccessTokenPairDto authenticate(OAuth2UserRequestDto oAuth2UserRequestDTO);

    String refreshAccessToken(String refreshToken);
}
