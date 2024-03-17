package ro.dragosghinea.users.model.ids;

import ro.dragosghinea.users.model.ProviderType;

import java.io.Serializable;

public class LinkedProviderId implements Serializable {
    private String providerUserId;
    private ProviderType provider;
}
