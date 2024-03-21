package ro.dragosghinea.users.model.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RefreshAccessTokenPairDto {

    private String accessToken;
    private String refreshToken;

}
