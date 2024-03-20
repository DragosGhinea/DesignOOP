package ro.dragosghinea.users.model.dto;

import lombok.*;
import ro.dragosghinea.users.model.ProviderType;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
public class LinkedProviderDto {

    private String providerUserId;
    private ProviderType provider;
    private UUID userId;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private UserDto user;

    private Long linkedAtDateInSeconds;
}
