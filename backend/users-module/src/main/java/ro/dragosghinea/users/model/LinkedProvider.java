package ro.dragosghinea.users.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Setter
@AllArgsConstructor
@Entity
public class LinkedProvider {

    @Id
    private String providerId;

    @Enumerated(EnumType.STRING)
    private ProviderType provider;

    @Column(name = "user_id")
    private UUID userId;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    private User user;

    private Long linkedAtDateInSeconds;

}
