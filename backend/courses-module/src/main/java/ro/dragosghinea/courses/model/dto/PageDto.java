package ro.dragosghinea.courses.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class PageDto<T> {
    private int pageNumber;
    private int pageSize;
    private int totalPages;
    private List<T> content = List.of();
}
