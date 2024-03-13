package ro.dragosghinea.courses.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.CONFLICT)
public class CourseAlreadyExists extends RuntimeException{

    public CourseAlreadyExists(String message) {
        super(message);
    }

    public CourseAlreadyExists() {
        super("Course already exists!");
    }
}
