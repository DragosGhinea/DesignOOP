package ro.dragosghinea.users.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@EqualsAndHashCode

@Entity
@Table(name = "USER_")
public class User {

    @Id
    @NonNull
    private UUID id;

    private String username;

    @Column(unique = true)
    @NonNull
    private String email;

    private String avatarUrl;

    @Builder.Default
    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private List<UserRole> roles = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<LinkedProvider> linkedProviders = new ArrayList<>();
}
