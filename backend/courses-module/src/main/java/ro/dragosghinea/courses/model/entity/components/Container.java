package ro.dragosghinea.courses.model.entity.components;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.*;
import ro.dragosghinea.courses.model.entity.CourseComponent;
import ro.dragosghinea.courses.model.entity.HasChildren;

import java.util.Collection;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonTypeName("container")
public class Container implements CourseComponent, HasChildren {
    @JsonIgnore // this field is handled by Jackson, we need to specify it here so MongoDB can save it
    private final String componentType = "container";

    private Collection<CourseComponent> children;

}
