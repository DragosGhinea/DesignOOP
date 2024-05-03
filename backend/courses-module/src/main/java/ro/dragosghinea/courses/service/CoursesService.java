package ro.dragosghinea.courses.service;

import ro.dragosghinea.courses.exceptions.CourseAlreadyExists;
import ro.dragosghinea.courses.exceptions.CourseNotFound;
import ro.dragosghinea.courses.model.dto.PageDto;
import ro.dragosghinea.courses.model.entity.Course;

import java.util.List;
import java.util.UUID;

public interface CoursesService {

    PageDto<Course> getCourses(int pageNumber, int pageSize, boolean fetchWithoutComponents);

    PageDto<Course> searchCourses(int pageNumber, int pageSize, String search, boolean fetchWithoutComponents);

    Course createCourse(Course course) throws CourseAlreadyExists;

    Course updateCourse(Course course) throws CourseNotFound;

    void deleteCourse(UUID courseId) throws CourseNotFound;
}
