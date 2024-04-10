package ro.dragosghinea.users.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ro.dragosghinea.users.model.User;
import ro.dragosghinea.users.model.dto.UserDto;

@Mapper(uses = {LinkedProviderMapper.class})
public interface UserMapper {

    @Mapping(source = "actualUsername", target="username")
    UserDto toDto(final User user);

    User toEntity(final UserDto userDto);
}
