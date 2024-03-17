package ro.dragosghinea.users.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.dragosghinea.users.exceptions.LinkedProviderNotFound;
import ro.dragosghinea.users.exceptions.UserNotFound;
import ro.dragosghinea.users.model.LinkedProvider;
import ro.dragosghinea.users.model.ProviderType;
import ro.dragosghinea.users.model.User;
import ro.dragosghinea.users.model.UserRole;
import ro.dragosghinea.users.security.LiteClientRegistration;
import ro.dragosghinea.users.security.OAuth2Fetcher;
import ro.dragosghinea.users.service.LinkedProviderService;
import ro.dragosghinea.users.service.OAuth2ToUserService;
import ro.dragosghinea.users.service.UserService;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GithubToUserServiceImpl implements OAuth2ToUserService {
    private final OAuth2Fetcher oAuth2Fetcher;
    private final LinkedProviderService linkedProviderService;
    private final UserService userService;

    @Transactional
    @Override
    public User getUserFromOAuth2(String accessToken) {
        Map<String, Object> userAttributes = oAuth2Fetcher.getUserAttributes(LiteClientRegistration.GITHUB, accessToken);
        String providerUserId = userAttributes.get("id").toString();
        String email = userAttributes.get("email").toString();

        // get user by email
        // if user exists check if the linked provider exists
        // if not create a new linked provider
        // if user does not exist create a new user and a new linked provider

        User user = null;
        try {
            user = userService.getUserByEmail(email);
            user.getLinkedProviders().stream().filter(linkedProvider -> linkedProvider.getProvider().equals(ProviderType.GITHUB)).findFirst().orElseThrow(LinkedProviderNotFound::new);
        }catch(UserNotFound e) {
            user = new User();
            user.setEmail(email);
            user.setAvatarUrl(ProviderType.GITHUB.name()+":"+userAttributes.get("avatar_url").toString());
            user.setId(UUID.randomUUID());
            user.setRoles(List.of(UserRole.MEMBER));
            user.setUsername(userAttributes.get("login").toString());

            user.getLinkedProviders().add(
                    LinkedProvider.builder()
                            .providerUserId(providerUserId)
                            .userId(user.getId())
                            .provider(ProviderType.GITHUB)
                            .linkedAtDateInSeconds(Instant.now().getEpochSecond())
                            .build()
            );
            userService.saveUser(user);
        }catch(LinkedProviderNotFound e) {
            LinkedProvider linkedProvider = LinkedProvider.builder()
                    .providerUserId(providerUserId)
                    .userId(user.getId())
                    .provider(ProviderType.GITHUB)
                    .linkedAtDateInSeconds(Instant.now().getEpochSecond())
                    .build();

            user.getLinkedProviders().add(linkedProvider);
            linkedProviderService.saveLinkedProvider(linkedProvider);
        }


        return user;
    }
}
