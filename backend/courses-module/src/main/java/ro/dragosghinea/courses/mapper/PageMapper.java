package ro.dragosghinea.courses.mapper;

import org.springframework.data.domain.Page;
import ro.dragosghinea.courses.model.dto.PageDto;

public interface PageMapper<T, U> {

    PageDto<T> toDto(Page<U> page, int pageNumber, int pageSize);

}
