package ro.dragosghinea.users.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.dragosghinea.users.exceptions.UpdateProfileFailed;
import ro.dragosghinea.users.exceptions.UserNotFound;
import ro.dragosghinea.users.mapper.UserMapper;
import ro.dragosghinea.users.model.User;
import ro.dragosghinea.users.model.dto.UpdateProfileDto;
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

    @Override
    public UserDto updateUser(UpdateProfileDto updateProfileDto) throws UserNotFound, UpdateProfileFailed {
        User user = userRepository.findById(updateProfileDto.getId())
                .orElseThrow(() -> new UserNotFound("User with id " + updateProfileDto.getId() + " not found."));

        userRepository.findByUsername(updateProfileDto.getUsername())
                .ifPresent(userWithUsername -> {
                    if (!userWithUsername.getId().equals(updateProfileDto.getId())) {
                        throw new UpdateProfileFailed("Username already taken");
                    }
                });

        if (updateProfileDto.getUsername() != null) {
            user.setUsername(updateProfileDto.getUsername());
        }

        if (updateProfileDto.getAvatarUrl() != null) {
            user.setAvatarUrl(updateProfileDto.getAvatarUrl());
        }

        userRepository.save(user);
        return userMapper.toDto(user);
    }
}
