package ro.dragosghinea.users.service;

import ro.dragosghinea.users.exceptions.LinkedProviderNotFound;
import ro.dragosghinea.users.model.LinkedProvider;
import ro.dragosghinea.users.model.dto.LinkedProviderDto;

import java.util.List;
import java.util.UUID;

public interface LinkedProviderService {

    LinkedProviderDto getLinkedProviderByEmailAndProvider(String email, String provider) throws LinkedProviderNotFound;

    void saveLinkedProvider(LinkedProviderDto linkedProvider);

    List<LinkedProviderDto> getLinkedProvidersByUserId(UUID userId);
}
