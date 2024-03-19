package ro.dragosghinea.users.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.dragosghinea.users.exceptions.LinkedProviderNotFound;
import ro.dragosghinea.users.exceptions.UserNotFound;
import ro.dragosghinea.users.model.LinkedProvider;
import ro.dragosghinea.users.model.ProviderType;
import ro.dragosghinea.users.model.User;
import ro.dragosghinea.users.model.UserRole;
import ro.dragosghinea.users.repository.LinkedProviderRepository;
import ro.dragosghinea.users.repository.UserRepository;
import ro.dragosghinea.users.security.LiteClientRegistration;
import ro.dragosghinea.users.security.OAuth2Fetcher;
import ro.dragosghinea.users.service.OAuth2ToUserService;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Log
public class GithubToUserServiceImpl implements OAuth2ToUserService {
    private final OAuth2Fetcher oAuth2Fetcher;
    private final UserRepository userRepository;
    private final LinkedProviderRepository linkedProviderRepository;

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
            user = userRepository.findByEmail(email).orElseThrow(UserNotFound::new);
            LinkedProvider foundLinkedProvider = user.getLinkedProviders().stream().filter(linkedProvider -> linkedProvider.getProvider().equals(ProviderType.GITHUB)).findFirst().orElseThrow(LinkedProviderNotFound::new);
            if (!foundLinkedProvider.getProviderUserId().equals(providerUserId)) {
                // for some reason the oauth2 id changed but the email is the same
                // should only happen in edge cases when the previous linked provider
                // changed email and another oauth2 account was created with the same email
                user.getLinkedProviders().remove(foundLinkedProvider);
                linkedProviderRepository.delete(foundLinkedProvider);
                linkedProviderRepository.flush();
                LinkedProvider linkedProvider = LinkedProvider.builder()
                        .providerUserId(providerUserId)
                        .userId(user.getId())
                        .provider(ProviderType.DISCORD)
                        .linkedAtDateInSeconds(Instant.now().getEpochSecond())
                        .build();
                linkedProviderRepository.saveAndFlush(linkedProvider);
                user.getLinkedProviders().add(linkedProvider);
            }
        }catch(UserNotFound e) {
            LinkedProvider linkedProvider = linkedProviderRepository.findByProviderUserIdAndProvider(providerUserId, ProviderType.DISCORD.name());
            if(linkedProvider != null) {
                log.warning("LinkedProvider already exists, but assigned to another user ("+linkedProvider.getUserId()+"). Will create a new user due to email change on the OAuth2 Provider.");
            }

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

            userRepository.save(user);
        }catch(LinkedProviderNotFound e) {
            LinkedProvider linkedProvider = linkedProviderRepository.findByProviderUserIdAndProvider(providerUserId, ProviderType.DISCORD.name());
            if(linkedProvider != null) {
                log.warning("LinkedProvider already exists, but assigned to another user ("+linkedProvider.getUserId()+"). Will move it to this user due to email change on the OAuth2 Provider.");
            }

            linkedProvider = LinkedProvider.builder()
                    .providerUserId(providerUserId)
                    .userId(user.getId())
                    .provider(ProviderType.GITHUB)
                    .linkedAtDateInSeconds(Instant.now().getEpochSecond())
                    .build();

            user.getLinkedProviders().add(linkedProvider);
        }


        return user;
    }
}
