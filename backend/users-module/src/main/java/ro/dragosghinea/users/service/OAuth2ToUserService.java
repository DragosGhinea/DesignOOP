package ro.dragosghinea.users.service;

import ro.dragosghinea.users.model.User;
import ro.dragosghinea.users.model.dto.UserDto;

public interface OAuth2ToUserService {

    UserDto getUserFromOAuth2(String accessToken);

}
