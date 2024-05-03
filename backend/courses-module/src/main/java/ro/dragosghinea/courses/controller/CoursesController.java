package ro.dragosghinea.courses.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.dragosghinea.courses.model.dto.PageDto;
import ro.dragosghinea.courses.model.entity.Course;
import ro.dragosghinea.courses.service.CoursesService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("v1/courses")
@RequiredArgsConstructor
public class CoursesController {

    private final CoursesService coursesService;

    @GetMapping
    public ResponseEntity<PageDto<Course>> getCourses(@RequestParam(defaultValue = "0") int pageNumber, @RequestParam(defaultValue = "10") int pageSize, @RequestParam(defaultValue = "") String search) {
        if (!search.isEmpty()) {
            return ResponseEntity.ok(coursesService.searchCourses(pageNumber, pageSize, search));
        }

        return ResponseEntity.ok(coursesService.getCourses(pageNumber, pageSize));
    }

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        return ResponseEntity.ok(coursesService.createCourse(course));
    }

    @PutMapping("/{courseId}")
    public ResponseEntity<Course> updateCourse(@PathVariable UUID courseId, @RequestBody Course course) {
        course.setId(courseId);
        return ResponseEntity.ok(coursesService.updateCourse(course));
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<Void> deleteCourse(@PathVariable UUID courseId) {
        coursesService.deleteCourse(courseId);
        return ResponseEntity.ok().build();
    }
}
