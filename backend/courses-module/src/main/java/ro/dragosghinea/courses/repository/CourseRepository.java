package ro.dragosghinea.courses.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import ro.dragosghinea.courses.model.entity.Course;

public interface CourseRepository extends MongoRepository<Course, String> {

}
