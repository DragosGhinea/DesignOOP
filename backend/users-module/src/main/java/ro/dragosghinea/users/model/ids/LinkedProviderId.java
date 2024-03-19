package ro.dragosghinea.users.model.ids;

import lombok.EqualsAndHashCode;
import ro.dragosghinea.users.model.ProviderType;

import java.io.Serializable;

@EqualsAndHashCode
public class LinkedProviderId implements Serializable {
    private String providerUserId;
    private ProviderType provider;
}
