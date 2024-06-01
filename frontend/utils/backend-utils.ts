// If the internal backend URL environment variable is set, it means this function is called brom the backend, so we return the internal backend URL.
export const getCoursesUrl = () => {
    if (process.env.INTERNAL_COURSES_BACKEND_URL)
        return process.env.INTERNAL_COURSES_BACKEND_URL;
    
    return process.env.NEXT_PUBLIC_COURSES_BACKEND_URL;
}

export const getUsersUrl = () => {
    if (process.env.INTERNAL_USERS_BACKEND_URL)
        return process.env.INTERNAL_USERS_BACKEND_URL;
    
    return process.env.NEXT_PUBLIC_USERS_BACKEND_URL;
}