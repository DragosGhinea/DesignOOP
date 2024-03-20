package ro.dragosghinea.users.mapper;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import ro.dragosghinea.users.model.LinkedProvider;
import ro.dragosghinea.users.model.ProviderType;
import ro.dragosghinea.users.model.User;
import ro.dragosghinea.users.model.UserRole;
import ro.dragosghinea.users.model.dto.LinkedProviderDto;
import ro.dragosghinea.users.model.dto.UserDto;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class UserMapperTests {

    @Autowired
    private UserMapper userMapper;

    @Test
    @DisplayName("Test toDto")
    public void testToDto() {
        UUID userId = UUID.randomUUID();
        User user = User.builder()
                .id(userId)
                .username("user")
                .roles(List.of(UserRole.MEMBER))
                .email("test@gmail.com")
                .linkedProviders(List.of(
                        LinkedProvider.builder()
                                .provider(ProviderType.GITHUB)
                                .providerUserId("123")
                                .userId(userId)
                                .build(),
                        LinkedProvider.builder()
                                .provider(ProviderType.DISCORD)
                                .providerUserId("456")
                                .userId(userId)
                                .build()
                ))
                .build();

        UserDto userDto = UserDto.builder()
                .id(userId)
                .username("user")
                .roles(List.of(UserRole.MEMBER))
                .email("test@gmail.com")
                .linkedProviders(List.of(
                        LinkedProviderDto.builder()
                                .provider(ProviderType.GITHUB)
                                .providerUserId("123")
                                .userId(userId)
                                .build(),
                        LinkedProviderDto.builder()
                                .provider(ProviderType.DISCORD)
                                .providerUserId("456")
                                .userId(userId)
                                .build()
                ))
                .build();

        assertEquals(userDto, userMapper.toDto(user), "DTOs are not equal");
    }

    @Test
    @DisplayName("Test toEntity")
    public void testToEntity() {
        UUID userId = UUID.randomUUID();
        User user = User.builder()
                .id(userId)
                .username("user")
                .roles(List.of(UserRole.MEMBER))
                .email("test@gmail.com")
                .linkedProviders(List.of(
                        LinkedProvider.builder()
                                .provider(ProviderType.GITHUB)
                                .providerUserId("123")
                                .userId(userId)
                                .build(),
                        LinkedProvider.builder()
                                .provider(ProviderType.DISCORD)
                                .providerUserId("456")
                                .userId(userId)
                                .build()
                ))
                .build();

        UserDto userDto = UserDto.builder()
                .id(userId)
                .username("user")
                .roles(List.of(UserRole.MEMBER))
                .email("test@gmail.com")
                .linkedProviders(List.of(
                        LinkedProviderDto.builder()
                                .provider(ProviderType.GITHUB)
                                .providerUserId("123")
                                .userId(userId)
                                .build(),
                        LinkedProviderDto.builder()
                                .provider(ProviderType.DISCORD)
                                .providerUserId("456")
                                .userId(userId)
                                .build()
                ))
                .build();

        assertEquals(user, userMapper.toEntity(userDto), "Entities are not equal");
    }
}
