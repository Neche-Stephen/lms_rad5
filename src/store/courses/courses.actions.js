import COURSES_ACTION_TYPES from "./courses.types"

export const addCourseName = (payload) => {
    return {
        type : COURSES_ACTION_TYPES.ADD_COURSE_NAME,
        payload : payload
    }
}
 