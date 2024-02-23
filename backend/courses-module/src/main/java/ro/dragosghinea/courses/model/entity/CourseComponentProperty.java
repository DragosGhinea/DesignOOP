package ro.dragosghinea.courses.model.entity;

import java.util.function.Supplier;

public record CourseComponentProperty<T>(String name, Supplier<T> valueGetter) {

}
