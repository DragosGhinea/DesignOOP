package ro.dragosghinea.courses.model.entity.components;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import ro.dragosghinea.courses.model.entity.CourseComponent;
import ro.dragosghinea.courses.model.entity.CourseComponentProperty;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@Builder
@JsonTypeName("paragraph")
public class Paragraph implements CourseComponent {
    @JsonIgnore // this field is handled by Jackson, we need to specify it here so MongoDB can save it
    private final String componentType = "paragraph";

    @JsonIgnore
    private Map<String, CourseComponentProperty<?>> params;

    private String title;
    private String text;

    @Override
    public Map<String, CourseComponentProperty<?>> getParams() {
        if (params != null)
            return params;

        params = new HashMap<>();
        params.put("title", new CourseComponentProperty<>("title", this::getTitle));
        params.put("text", new CourseComponentProperty<>("text", this::getText));

        return params;
    }
}
