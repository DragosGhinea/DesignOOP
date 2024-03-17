package ro.dragosghinea.users.service;

import ro.dragosghinea.users.exceptions.LinkedProviderNotFound;
import ro.dragosghinea.users.model.LinkedProvider;

import java.util.List;
import java.util.UUID;

public interface LinkedProviderService {

    LinkedProvider getLinkedProviderByEmailAndProvider(String email, String provider) throws LinkedProviderNotFound;

    void saveLinkedProvider(LinkedProvider linkedProvider);

    List<LinkedProvider> getLinkedProvidersByUserId(UUID userId);
}
