package ro.dragosghinea.courses.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.NOT_FOUND, reason="Course not found!")
public class CourseNotFound extends RuntimeException{

    public CourseNotFound(String message) {
        super(message);
    }

    public CourseNotFound() {
        super("Course not found!");
    }
}
