package ro.dragosghinea.users.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.dragosghinea.users.exceptions.LinkedProviderNotFound;
import ro.dragosghinea.users.mapper.LinkedProviderMapper;
import ro.dragosghinea.users.model.LinkedProvider;
import ro.dragosghinea.users.model.dto.LinkedProviderDto;
import ro.dragosghinea.users.repository.LinkedProviderRepository;
import ro.dragosghinea.users.service.LinkedProviderService;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LinkedProviderServiceImpl implements LinkedProviderService {
    private final LinkedProviderRepository linkedProviderRepository;

    private final LinkedProviderMapper linkedProviderMapper;

    @Override
    public LinkedProviderDto getLinkedProviderByEmailAndProvider(String email, String provider) throws LinkedProviderNotFound {
        LinkedProvider linkedProvider = linkedProviderRepository.findByEmailAndProvider(email, provider);
        if (linkedProvider == null)
            throw new LinkedProviderNotFound("LinkedProvider with email " + email + " and provider " + provider + " not found.");

        return linkedProviderMapper.toDto(linkedProvider);
    }

    @Override
    public List<LinkedProviderDto> getLinkedProvidersByUserId(UUID userId) {
        List<LinkedProvider> linkedProviderList = linkedProviderRepository.findByUserId(userId);

        return linkedProviderMapper.toDtoList(linkedProviderList);
    }

    @Override
    public void saveLinkedProvider(LinkedProviderDto linkedProvider) {
        throw new RuntimeException("Not implemented");
    }
}
