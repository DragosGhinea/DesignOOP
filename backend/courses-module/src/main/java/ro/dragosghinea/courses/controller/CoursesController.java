package ro.dragosghinea.courses.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.dragosghinea.courses.model.entity.Course;
import ro.dragosghinea.courses.service.CoursesService;

import java.util.List;

@RestController
@RequestMapping("v1/courses")
@RequiredArgsConstructor
public class CoursesController {

    private final CoursesService coursesService;
    private final ObjectMapper objectMapper;

    @GetMapping
    public ResponseEntity<List<Course>> getCourses(@RequestParam(defaultValue = "0") int offset, @RequestParam(defaultValue = "10") int limit) {
        //courseRepository.save(new Course( "Course 1", "Description 1"));
        return ResponseEntity.ok(coursesService.getCourses(offset, limit));
    }

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        return ResponseEntity.ok(course);
    }
}