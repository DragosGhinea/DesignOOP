package ro.dragosghinea.users.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@ToString
@EqualsAndHashCode
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Table
public class RefreshToken {

    @Id
    @Column(name = "user_id")
    private UUID userId;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    private User user;

    private String refreshToken;

    private Long lastRefresh;
}
