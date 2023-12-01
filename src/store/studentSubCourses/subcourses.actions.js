import SUBCOURSES_ACTION_TYPES from "./subcourses.types"

export const addSubCourseName = (payload) => {
    return {
        type : SUBCOURSES_ACTION_TYPES.ADD_SUBCOURSE_NAME,
        payload : payload
    }
}
 