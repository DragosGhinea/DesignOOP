package ro.dragosghinea.users.service;

import ro.dragosghinea.users.exceptions.UserNotFound;
import ro.dragosghinea.users.model.User;

import java.util.UUID;

public interface UserService {

    User getUserById(UUID id) throws UserNotFound;

    User getUserByEmail(String email) throws UserNotFound;

    void saveUser(User user);

}
