package ro.dragosghinea.courses.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.dragosghinea.courses.exceptions.CourseAlreadyExists;
import ro.dragosghinea.courses.exceptions.CourseNotFound;
import ro.dragosghinea.courses.model.entity.Course;
import ro.dragosghinea.courses.model.entity.components.Container;
import ro.dragosghinea.courses.model.entity.components.Paragraph;
import ro.dragosghinea.courses.repository.CourseRepository;
import ro.dragosghinea.courses.service.CoursesService;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CoursesServiceImpl implements CoursesService {

    private final CourseRepository courseRepository;

    @Override
    public List<Course> getCourses(int offset, int limit) {
        Course course = Course
                .builder()
                .title("Course 1")
                .description("Description 1")
                .components(List.of(
                        Container.builder()
                                .children(
                                        List.of(
                                                Paragraph.builder()
                                                        .title("Title 1")
                                                        .text("This is a paragraph")
                                                        .build(),
                                                Paragraph.builder()
                                                        .title("Title 2")
                                                        .text("This is another paragraph")
                                                        .build()
                                        )
                                )
                                .build()
                ))
                .build();

        courseRepository.save(course);

        return List.of(
                course
        );
    }

    @Override
    public Course createCourse(Course course) throws CourseAlreadyExists {
        if (course.getId() == null) {
            course.setId(UUID.randomUUID());
        }

        if (courseRepository.existsById(course.getId())) {
            throw new CourseAlreadyExists();
        }

        return courseRepository.save(course);
    }

    @Override
    public Course updateCourse(Course course) throws CourseNotFound {
        if (!courseRepository.existsById(course.getId())) {
            throw new CourseNotFound();
        }

        return courseRepository.save(course);
    }

    @Override
    public void deleteCourse(UUID courseId) throws CourseNotFound {
        if (!courseRepository.existsById(courseId)) {
            throw new CourseNotFound();
        }

        courseRepository.deleteById(courseId);
    }


}
