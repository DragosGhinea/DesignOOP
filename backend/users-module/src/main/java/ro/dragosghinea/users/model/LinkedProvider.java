package ro.dragosghinea.users.model;

import jakarta.persistence.*;
import lombok.*;
import ro.dragosghinea.users.model.ids.LinkedProviderId;

import java.util.UUID;

@Setter
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@ToString
@EqualsAndHashCode
@IdClass(LinkedProviderId.class)

@Entity
public class LinkedProvider {

    @Id
    private String providerUserId;

    @Id
    @Enumerated(EnumType.STRING)
    private ProviderType provider;

    @Column(name = "user_id")
    private UUID userId;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    private User user;

    private Long linkedAtDateInSeconds;

}
