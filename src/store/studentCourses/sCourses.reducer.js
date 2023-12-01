import COURSES_ACTION_TYPES from "./sCourses.types";

export const COURSES_INITIAL_STATE = {
  
}


export const studentCoursesReducer = (state = COURSES_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
  
    switch (type) {
      case COURSES_ACTION_TYPES.ADD_COURSE_NAME:
        return { ...state, ...payload };
      default:
        return state;
    }
  };