package ro.dragosghinea.courses.model.entity.components;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import ro.dragosghinea.courses.model.entity.CourseComponent;
import ro.dragosghinea.courses.model.entity.HasChildren;

import java.util.Collection;

@Getter
@Setter
@Builder
public class Container implements CourseComponent, HasChildren {
    private final String componentType = "container";

    private Collection<CourseComponent> children;

}
