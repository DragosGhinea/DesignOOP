package ro.dragosghinea.users.model.dto;

import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
public class UpdateProfileDto {
    private UUID id;

    @Pattern(regexp = "^[a-zA-Z0-9_]{3,30}$", message = "Username must be between 3 and 30 characters long and can only contain letters, numbers and underscores")
    private String username;

    @Pattern(regexp = "^(http|https)://[^ \"]+$", message = "The url does not have a valid format")
    private String avatarUrl;
}
