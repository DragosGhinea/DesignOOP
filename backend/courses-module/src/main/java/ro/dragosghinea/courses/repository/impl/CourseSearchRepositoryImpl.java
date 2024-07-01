package ro.dragosghinea.courses.repository.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.core.query.TextQuery;
import ro.dragosghinea.courses.model.entity.Course;
import ro.dragosghinea.courses.repository.CourseSearchRepository;

import java.util.List;

// https://medium.com/@dangeabunea/how-to-create-a-custom-mongodb-spring-data-repository-e51c343064e1
@RequiredArgsConstructor
public class CourseSearchRepositoryImpl implements CourseSearchRepository {
    private final MongoTemplate mongoTemplate;

    @Override
    public Page<Course> search(String query, int pageNumber, int pageSize, boolean fetchWithoutComponents) {
        Query textQuery = TextQuery.queryText(
                TextCriteria.forDefaultLanguage()
                        .caseSensitive(false)
                        .diacriticSensitive(false)
                        .matchingAny(query.split(" "))
        )
                .sortByScore()
                .with(PageRequest.of(pageNumber, pageSize));

        if (fetchWithoutComponents) {
            textQuery.fields().exclude("components");
        }

        List<Course> content = mongoTemplate.find(textQuery, Course.class);

        return new PageImpl<>(content, PageRequest.of(pageNumber, pageSize), -1);
    }
}
