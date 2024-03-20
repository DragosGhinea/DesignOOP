package ro.dragosghinea.users.service;

import ro.dragosghinea.users.model.User;
import ro.dragosghinea.users.model.dto.OAuth2UserRequestDTO;
import ro.dragosghinea.users.model.dto.UserDto;

public interface AuthenticationService {

    UserDto authenticate(OAuth2UserRequestDTO oAuth2UserRequestDTO);
}
