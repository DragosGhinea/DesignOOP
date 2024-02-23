package ro.dragosghinea.courses.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Collections;
import java.util.Map;

public interface CourseComponent {
    String getComponentType();

    @JsonIgnore
    default Map<String, CourseComponentProperty<?>> getParams() {
        return Collections.emptyMap();
    }
}
