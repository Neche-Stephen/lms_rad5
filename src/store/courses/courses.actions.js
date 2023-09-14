import COURSES_ACTION_TYPES from "./courses.types"

export const addCourse = (payload) => {
    console.log('yep!')
    return {
        type : COURSES_ACTION_TYPES.ADD_COURSE,
        payload : payload
    }
}
 