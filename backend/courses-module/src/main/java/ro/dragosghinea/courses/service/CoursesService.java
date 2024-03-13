package ro.dragosghinea.courses.service;

import ro.dragosghinea.courses.exceptions.CourseAlreadyExists;
import ro.dragosghinea.courses.exceptions.CourseNotFound;
import ro.dragosghinea.courses.model.entity.Course;

import java.util.List;
import java.util.UUID;

public interface CoursesService {

    List<Course> getCourses(int offset, int limit);

    Course createCourse(Course course) throws CourseAlreadyExists;

    Course updateCourse(Course course) throws CourseNotFound;

    void deleteCourse(UUID courseId) throws CourseNotFound;
}
