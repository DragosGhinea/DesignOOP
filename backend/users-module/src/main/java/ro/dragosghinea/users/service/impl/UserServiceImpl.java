package ro.dragosghinea.users.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.dragosghinea.users.exceptions.UserNotFound;
import ro.dragosghinea.users.mapper.UserMapper;
import ro.dragosghinea.users.model.User;
import ro.dragosghinea.users.model.dto.UserDto;
import ro.dragosghinea.users.repository.UserRepository;
import ro.dragosghinea.users.service.UserService;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserDto getUserById(UUID id) throws UserNotFound {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFound("User with id " + id + " not found."));

        return userMapper.toDto(user);
    }

    @Override
    public UserDto getUserByEmail(String email) throws UserNotFound {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFound("User with email " + email + " not found."));

        return userMapper.toDto(user);
    }

    @Override
    public void saveUser(UserDto user) {
        throw new RuntimeException("Not implemented");
    }
}
