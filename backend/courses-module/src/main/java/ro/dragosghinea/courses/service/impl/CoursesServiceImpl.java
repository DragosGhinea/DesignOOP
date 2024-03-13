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
        courseRepository.findById(course.getId()).ifPresent(c -> {
            throw new CourseAlreadyExists();
        });

        Course course1 =  courseRepository.save(course);
        course1.setTitle(course1.getTitle()+"[modified]");
        return course1;
    }

    @Override
    public Course updateCourse(Course course) throws CourseNotFound {
        return null;
    }

    @Override
    public void deleteCourse(UUID courseId) throws CourseNotFound {

    }


}
