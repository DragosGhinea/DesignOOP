package ro.dragosghinea.users.mapper;

import org.mapstruct.Condition;
import org.mapstruct.Mapper;
import ro.dragosghinea.users.model.LinkedProvider;
import ro.dragosghinea.users.model.User;
import ro.dragosghinea.users.model.dto.LinkedProviderDto;

import java.util.List;

@Mapper(uses = {UserNoLinkedProvidersMapper.class})
public interface LinkedProviderMapper extends LazyLoadingAwareMapper {

    LinkedProvider toEntity(final LinkedProviderDto linkedProviderDto);

    LinkedProviderDto toDto(final LinkedProvider linkedProvider);

    List<LinkedProvider> toEntityList(final List<LinkedProviderDto> linkedProviderDtoList);
    List<LinkedProviderDto> toDtoList(final List<LinkedProvider> linkedProviderList);

    @Condition
    default boolean isNotLazyLoadedUser(User user) {
        return isNotLazyLoaded(user);
    }
}
