package ro.dragosghinea.users.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ro.dragosghinea.users.model.dto.UpdateProfileDto;
import ro.dragosghinea.users.model.dto.UserDto;
import ro.dragosghinea.users.service.LinkedProviderService;
import ro.dragosghinea.users.service.UserService;

@RestController
@RequestMapping("v1/users")
@RequiredArgsConstructor
public class UsersController {

    private final UserService userService;
    private final LinkedProviderService linkedProviderService;

    @GetMapping("/me")
    public ResponseEntity<UserDto> getUserMe(Authentication authentication) {
        if (authentication == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Must be logged in to access this endpoint");
        }

        if (!(authentication.getPrincipal() instanceof UserDto userDto)) {
            System.out.println("Authentication is not a UserDto " + authentication.getPrincipal());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }

        userDto.setLinkedProviders(linkedProviderService.getLinkedProvidersByUserId(userDto.getId()));

        return ResponseEntity.ok(userDto);
    }

    @PatchMapping("/me")
    public ResponseEntity<UserDto> updateUserMe(Authentication authentication, @RequestBody UpdateProfileDto updatesDto) {
        if (authentication == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Must be logged in to access this endpoint");
        }

        if (!(authentication.getPrincipal() instanceof UserDto userDto)) {
            System.out.println("Authentication is not a UserDto " + authentication.getPrincipal());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }

        updatesDto.setId(userDto.getId());
        UserDto toReturn = userService.updateUser(updatesDto);

        return ResponseEntity.ok(toReturn);
    }
}
