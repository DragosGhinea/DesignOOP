package ro.dragosghinea.users.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ro.dragosghinea.users.model.User;
import ro.dragosghinea.users.model.dto.UserDto;

@Mapper
public interface UserNoLinkedProvidersMapper {

    @Mapping(target = "linkedProviders", ignore = true)
    User toEntity(final UserDto userDto);

    @Mapping(target = "linkedProviders", ignore = true)
    UserDto toDto(final User user);
}
