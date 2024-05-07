package ro.dragosghinea.courses.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ro.dragosghinea.courses.exceptions.CourseAlreadyExists;
import ro.dragosghinea.courses.exceptions.CourseNotFound;
import ro.dragosghinea.courses.mapper.CoursesPageMapper;
import ro.dragosghinea.courses.model.dto.PageDto;
import ro.dragosghinea.courses.model.entity.Course;
import ro.dragosghinea.courses.repository.CourseRepository;
import ro.dragosghinea.courses.service.CoursesService;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CoursesServiceImpl implements CoursesService {

    private final CourseRepository courseRepository;
    private final CoursesPageMapper pageMapper;

    @Override
    public PageDto<Course> getCourses(int pageNumber, int pageSize, boolean fetchWithoutComponents) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Course> pageCourse = fetchWithoutComponents ? courseRepository.findAllExcludeComponents(pageable) : courseRepository.findAll(pageable);
        return pageMapper.toDto(pageCourse, pageNumber, pageSize);
    }

    @Override
    public Course getCourse(UUID courseId) throws CourseNotFound {
        return courseRepository.findById(courseId).orElseThrow(CourseNotFound::new);
    }

    @Override
    public PageDto<Course> searchCourses(int pageNumber, int pageSize, String search, boolean fetchWithoutComponents) {
        return pageMapper.toDto(courseRepository.search(search, pageNumber, pageSize, fetchWithoutComponents), pageNumber, pageSize);
    }

    @Override
    public Course createCourse(Course course) throws CourseAlreadyExists {
        if (course.getId() == null) {
            course.setId(UUID.randomUUID());
        }

        if (courseRepository.existsById(course.getId())) {
            throw new CourseAlreadyExists();
        }

        try {
            return courseRepository.save(course);
        }catch (DuplicateKeyException e){
            throw new CourseAlreadyExists("Course with this title already exists!");
        }
    }

    @Override
    public Course updateCourse(Course course) throws CourseNotFound {
        if (!courseRepository.existsById(course.getId())) {
            throw new CourseNotFound();
        }

        try {
            return courseRepository.save(course);
        }catch (DuplicateKeyException e){
            throw new CourseAlreadyExists("Course with this title already exists!");
        }
    }

    @Override
    public void deleteCourse(UUID courseId) throws CourseNotFound {
        if (!courseRepository.existsById(courseId)) {
            throw new CourseNotFound();
        }

        courseRepository.deleteById(courseId);
    }


}
