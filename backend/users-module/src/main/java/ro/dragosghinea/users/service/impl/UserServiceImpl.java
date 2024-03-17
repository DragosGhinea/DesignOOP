package ro.dragosghinea.users.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.dragosghinea.users.exceptions.UserNotFound;
import ro.dragosghinea.users.model.User;
import ro.dragosghinea.users.repository.UserRepository;
import ro.dragosghinea.users.service.UserService;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User getUserById(UUID id) throws UserNotFound {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFound("User with id " + id + " not found."));
    }

    @Override
    public User getUserByEmail(String email) throws UserNotFound {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFound("User with email " + email + " not found."));
    }

    @Override
    public void saveUser(User user) {
        userRepository.save(user);
    }
}
