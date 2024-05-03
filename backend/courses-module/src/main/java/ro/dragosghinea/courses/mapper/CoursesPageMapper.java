package ro.dragosghinea.courses.mapper;

import org.mapstruct.Mapper;
import ro.dragosghinea.courses.model.entity.Course;

@Mapper
public interface CoursesPageMapper extends PageMapper<Course, Course>{
}
