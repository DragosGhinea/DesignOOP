package ro.dragosghinea.users.service.impl;

import org.springframework.stereotype.Service;
import ro.dragosghinea.users.model.User;
import ro.dragosghinea.users.service.OAuth2ToUserService;

@Service
public class GithubToUserServiceImpl implements OAuth2ToUserService {
    @Override
    public User getUserFromOAuth2(String accessToken) {
        return null;
    }
}
