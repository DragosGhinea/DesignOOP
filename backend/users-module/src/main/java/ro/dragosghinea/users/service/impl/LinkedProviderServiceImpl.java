package ro.dragosghinea.users.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.dragosghinea.users.exceptions.LinkedProviderNotFound;
import ro.dragosghinea.users.model.LinkedProvider;
import ro.dragosghinea.users.repository.LinkedProviderRepository;
import ro.dragosghinea.users.service.LinkedProviderService;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LinkedProviderServiceImpl implements LinkedProviderService {
    private final LinkedProviderRepository linkedProviderRepository;

    @Override
    public LinkedProvider getLinkedProviderByEmailAndProvider(String email, String provider) throws LinkedProviderNotFound {
        LinkedProvider linkedProvider = linkedProviderRepository.findByEmailAndProvider(email, provider);
        if (linkedProvider == null)
            throw new LinkedProviderNotFound("LinkedProvider with email " + email + " and provider " + provider + " not found.");

        return linkedProvider;
    }

    @Override
    public void saveLinkedProvider(LinkedProvider linkedProvider) {
        linkedProviderRepository.save(linkedProvider);
    }

    @Override
    public List<LinkedProvider> getLinkedProvidersByUserId(UUID userId) {
        return linkedProviderRepository.findByUserId(userId);
    }
}
