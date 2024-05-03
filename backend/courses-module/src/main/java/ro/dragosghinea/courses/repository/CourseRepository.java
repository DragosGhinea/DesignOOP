package ro.dragosghinea.courses.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import ro.dragosghinea.courses.model.entity.Course;

import java.util.UUID;

public interface CourseRepository extends MongoRepository<Course, UUID>, CourseSearchRepository {

}
