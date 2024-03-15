package ro.dragosghinea.users.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class OAuth2UserRequestDTO {
    private String clientRegistrationId;
    private String accessToken;
}
