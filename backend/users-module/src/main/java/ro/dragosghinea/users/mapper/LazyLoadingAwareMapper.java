package ro.dragosghinea.users.mapper;

import org.hibernate.Hibernate;

public interface LazyLoadingAwareMapper {

    default boolean isNotLazyLoaded(Object object){
        if (Hibernate.isInitialized(object)) {
            return true;
        }

        return false;
    }
}
