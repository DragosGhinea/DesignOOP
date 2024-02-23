package ro.dragosghinea.courses.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collection;
import java.util.UUID;

@Document
@Setter
@Getter
@Builder
@AllArgsConstructor
public class Course {
    @Id
    @Builder.Default
    private UUID id = UUID.randomUUID();
    private String title;
    private String description;
    private Collection<CourseComponent> components;
}
