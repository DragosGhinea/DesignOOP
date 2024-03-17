package ro.dragosghinea.users.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import ro.dragosghinea.users.model.LinkedProvider;
import ro.dragosghinea.users.model.ProviderType;
import ro.dragosghinea.users.model.User;
import ro.dragosghinea.users.model.UserRole;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
public class UserCreationRepositoryTests {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LinkedProviderRepository linkedProviderRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Test
    @DisplayName("Test user creation without linked provider")
    public void testUserCreationWithoutLinkedProvider() {
        UUID userId = UUID.randomUUID();
        User user = User.builder()
                .id(userId)
                .roles(List.of(UserRole.MEMBER))
                .avatarUrl("someUrl")
                .username("test")
                .email("testing@gmail.com")
                .build();

        User savedUser = userRepository.saveAndFlush(user);
        entityManager.detach(savedUser);

        User fetchedUser = userRepository.findById(userId).orElse(null);
        assertEquals(user, fetchedUser, "User is not saved correctly");
    }

    @Test
    @DisplayName("Test user creation with linked provider")
    public void testUserCreationWithLinkedProvider() {
        UUID userId = UUID.randomUUID();
        User user = User.builder()
                .id(userId)
                .avatarUrl("someUrl")
                .username("test")
                .email("testing@gmail.com")
                .build();

        LinkedProvider linkedProvider = LinkedProvider.builder()
                .providerUserId("123")
                .provider(ProviderType.GITHUB)
                .userId(userId)
                .linkedAtDateInSeconds(Instant.now().getEpochSecond())
                .build();

        user.getLinkedProviders().add(linkedProvider);

        User savedUser = userRepository.saveAndFlush(user);
        entityManager.detach(savedUser);

        User fetchedUser = userRepository.findById(userId).orElse(null);
        assertEquals(user, fetchedUser, "User is not saved correctly");

        List<LinkedProvider> linkedProviders = linkedProviderRepository.findByUserId(userId);
        assertEquals(user.getLinkedProviders(), linkedProviders, "Linked provider is not saved correctly");
    }

    @Test
    @DisplayName("Test linked provider overwrite should result in merge in database not overwrite")
    public void testUserOverwritingLinkedProvider() {
        UUID userId = UUID.randomUUID();
        User user = User.builder()
                .id(userId)
                .avatarUrl("someUrl")
                .username("test")
                .email("testing@gmail.com")
                .build();

        List<LinkedProvider> linkedProviders = List.of(
                LinkedProvider.builder()
                        .providerUserId("123")
                        .provider(ProviderType.GITHUB)
                        .userId(userId)
                        .linkedAtDateInSeconds(Instant.now().getEpochSecond())
                        .build(),
                LinkedProvider.builder()
                        .providerUserId("123")
                        .provider(ProviderType.DISCORD)
                        .userId(userId)
                        .linkedAtDateInSeconds(Instant.now().getEpochSecond())
                        .build()
        );

        user.getLinkedProviders().add(linkedProviders.get(0));

        User savedUser = userRepository.saveAndFlush(user);
        entityManager.detach(savedUser);

        user.getLinkedProviders().set(0, linkedProviders.get(1));

        User savedUser2 = userRepository.saveAndFlush(user);
        entityManager.detach(savedUser2);

        User fetchedUser = userRepository.findById(userId).orElse(null);
        assertNotNull(fetchedUser, "User should not be null");

        assertEquals(linkedProviders, fetchedUser.getLinkedProviders(), "User is not saved correctly");
    }
}
