package ro.dragosghinea.courses.model.entity;

import java.util.Collection;
import java.util.Collections;

public interface HasChildren {

    default Collection<CourseComponent> getChildren() {
        return Collections.emptyList();
    }

}
