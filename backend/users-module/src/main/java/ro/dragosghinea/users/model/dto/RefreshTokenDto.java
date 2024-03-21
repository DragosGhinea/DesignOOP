package ro.dragosghinea.users.model.dto;

import lombok.*;

import java.util.UUID;

@ToString
@EqualsAndHashCode
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RefreshTokenDto {

    private UUID userId;

    @EqualsAndHashCode.Exclude
    private UserDto user;

    private String refreshToken;

    private Long lastRefresh;

}
