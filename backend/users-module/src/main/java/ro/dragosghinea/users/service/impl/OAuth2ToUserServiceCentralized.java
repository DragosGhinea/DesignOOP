package ro.dragosghinea.users.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.dragosghinea.users.exceptions.ClientRegistrationNotFound;
import ro.dragosghinea.users.model.dto.OAuth2UserRequestDto;
import ro.dragosghinea.users.model.dto.UserDto;

@Service
@RequiredArgsConstructor
public class OAuth2ToUserServiceCentralized {
    private final GithubToUserServiceImpl githubToUserServiceImpl;
    private final DiscordToUserServiceImpl discordToUserServiceImpl;


    public UserDto getUserFromOAuth2(OAuth2UserRequestDto oAuth2UserRequestDTO) {
        return switch (oAuth2UserRequestDTO.getClientRegistrationId()) {
            case "github" -> githubToUserServiceImpl.getUserFromOAuth2(oAuth2UserRequestDTO.getAccessToken());

            case "discord" -> discordToUserServiceImpl.getUserFromOAuth2(oAuth2UserRequestDTO.getAccessToken());

            default -> throw new ClientRegistrationNotFound("Client registration "+oAuth2UserRequestDTO.getClientRegistrationId()+" not found!");
        };
    }
}
