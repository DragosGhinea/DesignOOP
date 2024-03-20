package ro.dragosghinea.users.model.dto;

import lombok.*;
import ro.dragosghinea.users.model.UserRole;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
public class UserDto {
    private UUID id;
    private String username;
    private String email;
    private String avatarUrl;

    @Builder.Default
    private List<UserRole> roles = new ArrayList<>();

    @Builder.Default
    private List<LinkedProviderDto> linkedProviders = new ArrayList<>();
}
