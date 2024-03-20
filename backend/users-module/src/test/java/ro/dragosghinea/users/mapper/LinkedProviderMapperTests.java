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
public class LinkedProviderMapperTests {

    @Autowired
    private LinkedProviderMapper linkedProviderMapper;

    @Test
    @DisplayName("Test toDto")
    public void testToDto() {
        UUID userId = UUID.randomUUID();
        LinkedProvider linkedProvider = LinkedProvider.builder()
                .provider(ProviderType.GITHUB)
                .providerUserId("123")
                .userId(userId)
                .build();

        LinkedProviderDto linkedProviderDto = LinkedProviderDto.builder()
                .provider(ProviderType.GITHUB)
                .providerUserId("123")
                .userId(userId)
                .build();

        assertEquals(linkedProviderDto, linkedProviderMapper.toDto(linkedProvider), "DTOs are not equal");
    }

    @Test
    @DisplayName("Test toEntity")
    public void testToEntity() {
        UUID userId = UUID.randomUUID();
        LinkedProvider linkedProvider = LinkedProvider.builder()
                .provider(ProviderType.GITHUB)
                .providerUserId("123")
                .userId(userId)
                .build();

        LinkedProviderDto linkedProviderDto = LinkedProviderDto.builder()
                .provider(ProviderType.GITHUB)
                .providerUserId("123")
                .userId(userId)
                .build();

        assertEquals(linkedProvider, linkedProviderMapper.toEntity(linkedProviderDto), "Entities are not equal");
    }

    @Test
    @DisplayName("Test toDto with user")
    public void testToDtoWithUser() {
        UUID userId = UUID.randomUUID();
        User user = User.builder()
                .id(userId)
                .username("user")
                .roles(List.of(UserRole.MEMBER))
                .email("test@gmail.com")
                .build();

        UserDto userDto = UserDto.builder()
                .id(userId)
                .username("user")
                .roles(List.of(UserRole.MEMBER))
                .email("test@gmail.com")
                .build();

        LinkedProvider linkedProvider = LinkedProvider.builder()
                .provider(ProviderType.GITHUB)
                .providerUserId("123")
                .userId(userId)
                .user(user)
                .build();

        LinkedProviderDto linkedProviderDto = LinkedProviderDto.builder()
                .provider(ProviderType.GITHUB)
                .providerUserId("123")
                .userId(userId)
                .user(userDto)
                .build();

        assertEquals(linkedProviderDto, linkedProviderMapper.toDto(linkedProvider), "DTOs are not equal");
    }

    @Test
    @DisplayName("Test toEntity with user")
    public void testToEntityWithUser() {
        UUID userId = UUID.randomUUID();
        User user = User.builder()
                .id(userId)
                .username("user")
                .roles(List.of(UserRole.MEMBER))
                .email("test@gmail.com")
                .build();

        UserDto userDto = UserDto.builder()
                .id(userId)
                .username("user")
                .roles(List.of(UserRole.MEMBER))
                .email("test@gmail.com")
                .build();

        LinkedProvider linkedProvider = LinkedProvider.builder()
                .provider(ProviderType.GITHUB)
                .providerUserId("123")
                .userId(userId)
                .user(user)
                .build();

        LinkedProviderDto linkedProviderDto = LinkedProviderDto.builder()
                .provider(ProviderType.GITHUB)
                .providerUserId("123")
                .userId(userId)
                .user(userDto)
                .build();

        assertEquals(linkedProvider, linkedProviderMapper.toEntity(linkedProviderDto), "Entities are not equal");
    }
}
