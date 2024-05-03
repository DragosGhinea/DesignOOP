package ro.dragosghinea.courses.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import ro.dragosghinea.courses.model.entity.Course;

import java.util.UUID;

public interface CourseRepository extends MongoRepository<Course, UUID>, CourseSearchRepository {

    @Query(value = "{}", fields = "{ 'components' : 0 }")
    Page<Course> findAllExcludeComponents(Pageable pageable);

}
