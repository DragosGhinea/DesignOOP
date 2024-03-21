package ro.dragosghinea.users.mapper;

import org.mapstruct.Mapper;
import ro.dragosghinea.users.model.RefreshToken;
import ro.dragosghinea.users.model.dto.RefreshTokenDto;

@Mapper(uses = {UserNoLinkedProvidersMapper.class})
public interface RefreshTokenMapper {

    RefreshToken toEntity(RefreshTokenDto refreshTokenDto);

    RefreshTokenDto toDto(RefreshToken refreshToken);

}
