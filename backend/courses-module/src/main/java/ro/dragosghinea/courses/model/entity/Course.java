package ro.dragosghinea.courses.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collection;
import java.util.List;
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

    @Indexed(unique = true)
    private String title;

    private String subtitle;
    private String description;
    private List<String> tags;
    private Collection<CourseComponent> components;
}
