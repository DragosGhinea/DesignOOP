package ro.dragosghinea.courses.repository;

import org.springframework.data.domain.Page;
import ro.dragosghinea.courses.model.entity.Course;

public interface CourseSearchRepository {

    Page<Course> search(String query, int pageNumber, int pageSize);
}
