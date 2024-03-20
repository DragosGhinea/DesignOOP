package ro.dragosghinea.users.service;

import ro.dragosghinea.users.exceptions.UserNotFound;
import ro.dragosghinea.users.model.User;
import ro.dragosghinea.users.model.dto.UserDto;

import java.util.UUID;

public interface UserService {

    UserDto getUserById(UUID id) throws UserNotFound;

    UserDto getUserByEmail(String email) throws UserNotFound;

    void saveUser(UserDto userDto);
}
