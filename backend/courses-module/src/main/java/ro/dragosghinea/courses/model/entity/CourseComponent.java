package ro.dragosghinea.courses.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import ro.dragosghinea.courses.model.entity.components.Container;
import ro.dragosghinea.courses.model.entity.components.Paragraph;

import java.util.Collections;
import java.util.Map;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        property = "componentType"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = Paragraph.class),
        @JsonSubTypes.Type(value = Container.class)
})
public interface CourseComponent {
    String getComponentType();

    // MongoDB throws an error if we don't specify this method
    default void setComponentType(String componentType) {}

    @JsonIgnore
    default Map<String, CourseComponentProperty<?>> getParams() {
        return Collections.emptyMap();
    }
}
