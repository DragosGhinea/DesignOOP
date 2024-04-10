package ro.dragosghinea.users.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
public class UpdateProfileDto {
    private UUID id;
    private String username;
    private String avatarUrl;
}
