package ro.dragosghinea.courses.service;

import ro.dragosghinea.courses.model.entity.Course;

import java.util.List;

public interface CoursesService {

    List<Course> getCourses(int offset, int limit);
}
