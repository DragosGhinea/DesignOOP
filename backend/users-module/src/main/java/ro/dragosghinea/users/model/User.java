package ro.dragosghinea.users.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@Entity
@Table(name = "USER_")
public class User {

    @Id
    private UUID id;

    private String username;

    @Column(unique = true)
    private String email;

    private String avatarUrl;

    @ElementCollection(fetch = FetchType.LAZY)
    @Enumerated(EnumType.STRING)
    private List<UserRole> role;
}
