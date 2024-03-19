package ro.dragosghinea.users.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import ro.dragosghinea.users.exceptions.UserNotFound;
import ro.dragosghinea.users.model.LinkedProvider;
import ro.dragosghinea.users.model.ProviderType;
import ro.dragosghinea.users.model.User;
import ro.dragosghinea.users.repository.LinkedProviderRepository;
import ro.dragosghinea.users.repository.UserRepository;
import ro.dragosghinea.users.security.OAuth2Fetcher;
import ro.dragosghinea.users.service.impl.GithubToUserServiceImpl;

import java.time.Instant;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;

@SpringBootTest
public class GithubToUserServiceTests {

    @Mock
    protected OAuth2Fetcher oAuth2Fetcher;

    @Mock
    protected UserRepository userRepository;

    @Mock
    protected LinkedProviderRepository linkedProviderRepository;

    @InjectMocks
    protected GithubToUserServiceImpl oauth2ToUserService;

    @Test
    @DisplayName("No user in database")
    public void testGetUserFromOAuth2() {
        when(oAuth2Fetcher.getUserAttributes(any(), any())).thenReturn(Map.of(
                "id", "testId",
                "email", "testEmail@gmail.com",
                "avatar_url", "testAvatar",
                "login", "testUsername"
        ));
        when(userRepository.findByEmail(any())).thenThrow(new UserNotFound());

        User user = oauth2ToUserService.getUserFromOAuth2("testToken");
        assertEquals(1, user.getLinkedProviders().size(), "User should have one linked provider");
        assertEquals("testId", user.getLinkedProviders().get(0).getProviderUserId(), "User should have the linked provider with the correct providerUserId");
    }

    @Test
    @DisplayName("User in database, no linked providers")
    public void testGetUserFromOAuth2_ExistingUser() {
        when(oAuth2Fetcher.getUserAttributes(any(), any())).thenReturn(Map.of(
                "id", "testId",
                "email", "testEmail@gmail.com",
                "avatar_url", "testAvatar",
                "login", "testUsername"
        ));
        UUID userId = UUID.randomUUID();
        when(userRepository.findByEmail(any())).thenReturn(
                Optional.of(
                        User.builder()
                                .id(userId)
                                .email("testEmail@gmail.com")
                                .build()
                )
        );

        User user = oauth2ToUserService.getUserFromOAuth2("testToken");
        assertEquals(1, user.getLinkedProviders().size(), "User should have one linked provider");
        assertEquals("testId", user.getLinkedProviders().get(0).getProviderUserId(), "User should have the linked provider with the correct providerUserId");
    }

    @Test
    @DisplayName("User in database, one different type linked provider")
    public void testGetUserFromOAuth2_ExistingUser_DiscordLinkedProvider() {
        when(oAuth2Fetcher.getUserAttributes(any(), any())).thenReturn(Map.of(
                "id", "testId",
                "email", "testEmail@gmail.com",
                "avatar_url", "testAvatar",
                "login", "testUsername"
        ));
        UUID userId = UUID.randomUUID();
        when(userRepository.findByEmail(any())).thenReturn(
                Optional.of(
                        User.builder()
                                .id(userId)
                                .email("testEmail@gmail.com")
                                .linkedProviders(new ArrayList<>(List.of(
                                                LinkedProvider.builder()
                                                        .provider(ProviderType.DISCORD)
                                                        .providerUserId("testId")
                                                        .userId(userId)
                                                        .linkedAtDateInSeconds(Instant.now().getEpochSecond())
                                                        .build()
                                        ))
                                )
                                .build()
                )
        );

        User user = oauth2ToUserService.getUserFromOAuth2("testToken");
        assertEquals(2, user.getLinkedProviders().size(), "User should have one linked provider");
        LinkedProvider githubLinkedProvider = user.getLinkedProviders().stream()
                .filter(linkedProvider -> linkedProvider.getProvider().equals(ProviderType.GITHUB))
                .findFirst().orElse(null);
        assertNotNull(githubLinkedProvider, "User should have a linked provider with the correct provider type");
        assertEquals("testId", githubLinkedProvider.getProviderUserId(), "User should have the linked provider with the correct providerUserId");
    }

    @Test
    @DisplayName("User in database, one same type linked provider")
    public void testGetUserFromOAuth2_ExistingUser_GithubLinkedProvider() {
        when(oAuth2Fetcher.getUserAttributes(any(), any())).thenReturn(Map.of(
                "id", "testId",
                "email", "testEmail@gmail.com",
                "avatar_url", "testAvatar",
                "login", "testUsername"
        ));
        UUID userId = UUID.randomUUID();
        when(userRepository.findByEmail(any())).thenReturn(
                Optional.of(
                        User.builder()
                                .id(userId)
                                .email("testEmail@gmail.com")
                                .linkedProviders(new ArrayList<>(List.of(
                                                LinkedProvider.builder()
                                                        .provider(ProviderType.GITHUB)
                                                        .providerUserId("testId")
                                                        .userId(userId)
                                                        .linkedAtDateInSeconds(Instant.now().getEpochSecond())
                                                        .build()
                                        ))
                                )
                                .build()
                )
        );

        User user = oauth2ToUserService.getUserFromOAuth2("testToken");
        assertEquals(1, user.getLinkedProviders().size(), "User should have one linked provider");
        assertEquals("testId", user.getLinkedProviders().get(0).getProviderUserId(), "User should have the linked provider with the correct providerUserId");
    }

    @Test
    @DisplayName("User in database, one same type linked provider with different providerUserId")
    public void testGetUserFromOAuth2_ExistingUser_GithubLinkedProvider_DifferentProviderUserId() {
        when(oAuth2Fetcher.getUserAttributes(any(), any())).thenReturn(Map.of(
                "id", "testId",
                "email", "testEmail@gmail.com",
                "avatar_url", "testAvatar",
                "login", "testUsername"
        ));
        UUID userId = UUID.randomUUID();
        when(userRepository.findByEmail(any())).thenReturn(
                Optional.of(
                        User.builder()
                                .id(userId)
                                .email("testEmail@gmail.com")
                                .linkedProviders(new ArrayList<>(List.of(
                                                LinkedProvider.builder()
                                                        .provider(ProviderType.GITHUB)
                                                        .providerUserId("testIdDifferent")
                                                        .userId(userId)
                                                        .linkedAtDateInSeconds(Instant.now().getEpochSecond())
                                                        .build()
                                        ))
                                )
                                .build()
                )
        );

        User user = oauth2ToUserService.getUserFromOAuth2("testToken");
        assertEquals(1, user.getLinkedProviders().size(), "User should have one linked provider");
        assertEquals("testId", user.getLinkedProviders().get(0).getProviderUserId(), "User should have the linked provider with the correct providerUserId");
    }

    @Test
    @DisplayName("User in database, one same type linked provider belonging to another user")
    public void testGetUserFromOAuth2_ExistingUser_GithubLinkedProvider_DifferentProviderUserId_AnotherUser() {
        when(oAuth2Fetcher.getUserAttributes(any(), any())).thenReturn(Map.of(
                "id", "testId",
                "email", "testEmail@gmail.com",
                "avatar_url", "testAvatar",
                "login", "testUsername"
        ));
        UUID userId = UUID.randomUUID();
        when(userRepository.findByEmail(any())).thenReturn(
                Optional.of(
                        User.builder()
                                .id(userId)
                                .email("testEmail@gmail.com")
                                .build()
                )
        );
        when(linkedProviderRepository.findByProviderUserIdAndProvider(any(), any())).thenReturn(
                LinkedProvider.builder()
                        .provider(ProviderType.GITHUB)
                        .providerUserId("testId")
                        .userId(UUID.randomUUID())
                        .linkedAtDateInSeconds(Instant.now().getEpochSecond())
                        .build()
        );

        User user = oauth2ToUserService.getUserFromOAuth2("testToken");
        assertEquals(1, user.getLinkedProviders().size(), "User should have one linked provider");
        assertEquals("testId", user.getLinkedProviders().get(0).getProviderUserId(), "User should have the linked provider with the correct providerUserId");
    }

    @Test
    @DisplayName("No user in database, one same type linked provider belonging to another user")
    public void testGetUserFromOAuth2_NoUser_GithubLinkedProvider_DifferentProviderUserId_AnotherUser() {
        when(oAuth2Fetcher.getUserAttributes(any(), any())).thenReturn(Map.of(
                "id", "testId",
                "email", "testEmail@gmail.com",
                "avatar_url", "testAvatar",
                "login", "testUsername"
        ));
        when(userRepository.findByEmail(any())).thenThrow(new UserNotFound());
        when(linkedProviderRepository.findByProviderUserIdAndProvider(any(), any())).thenReturn(
                LinkedProvider.builder()
                        .provider(ProviderType.GITHUB)
                        .providerUserId("testId")
                        .userId(UUID.randomUUID())
                        .linkedAtDateInSeconds(Instant.now().getEpochSecond())
                        .build()
        );

        User user = oauth2ToUserService.getUserFromOAuth2("testToken");
        assertEquals(1, user.getLinkedProviders().size(), "User should have one linked provider");
        assertEquals("testId", user.getLinkedProviders().get(0).getProviderUserId(), "User should have the linked provider with the correct providerUserId");
    }

}