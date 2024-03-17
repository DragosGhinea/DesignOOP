package ro.dragosghinea.users.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.dragosghinea.users.exceptions.ClientRegistrationNotFound;
import ro.dragosghinea.users.model.User;
import ro.dragosghinea.users.model.dto.OAuth2UserRequestDTO;
import ro.dragosghinea.users.service.AuthenticationService;

@RequiredArgsConstructor
@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final GithubToUserServiceImpl githubToUserServiceImpl;
    private final DiscordToUserServiceImpl discordToUserServiceImpl;

    @Override
    public User authenticate(OAuth2UserRequestDTO oAuth2UserRequestDTO) {
        switch (oAuth2UserRequestDTO.getClientRegistrationId()) {
            case "github" -> {
                return githubToUserServiceImpl.getUserFromOAuth2(oAuth2UserRequestDTO.getAccessToken());
            }
            case "discord" -> {
                return discordToUserServiceImpl.getUserFromOAuth2(oAuth2UserRequestDTO.getAccessToken());
            }
            default -> {
                throw new ClientRegistrationNotFound("Client registration "+oAuth2UserRequestDTO.getClientRegistrationId()+" not found!");
            }
        }
    }
}
