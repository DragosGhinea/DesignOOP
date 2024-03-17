package ro.dragosghinea.users.service;

import ro.dragosghinea.users.model.User;

public interface OAuth2ToUserService {

    User getUserFromOAuth2(String accessToken);

}
