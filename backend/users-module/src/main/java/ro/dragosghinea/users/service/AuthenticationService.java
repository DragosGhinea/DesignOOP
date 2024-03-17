package ro.dragosghinea.users.service;

import ro.dragosghinea.users.model.User;
import ro.dragosghinea.users.model.dto.OAuth2UserRequestDTO;

public interface AuthenticationService {

    User authenticate(OAuth2UserRequestDTO oAuth2UserRequestDTO);
}
