package ro.dragosghinea.courses.model.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.TextScore;

import java.util.List;
import java.util.UUID;

@Document
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    @Id
    @Builder.Default
    private UUID id = UUID.randomUUID();

    @Indexed(unique = true)
    @TextIndexed(weight = 5)
    private String title;

    @TextIndexed(weight = 3)
    private String subtitle;

    @TextIndexed(weight = 2)
    private String description;

    @TextIndexed(weight = 4)
    private List<String> tags;

    @TextIndexed(weight = 1)
    private Object components;

    @TextScore
    private Float textSearchScore;
}
