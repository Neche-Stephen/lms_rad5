import COURSES_ACTION_TYPES from "./courses.types";

export const COURSES_INITIAL_STATE = {
    // {
    //     course_name  : 'Front-End Web Development',
    // },
    // {
    //     course_name  : 'UI/UX Design',
    // }
    front_end : {
        courseName  : 'Front-End Web Development',
    },
    ui_ux : {
        courseName  : 'Front-End Web Development',
    },

}


export const coursesReducer = (state = COURSES_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
  
    switch (type) {
      case COURSES_ACTION_TYPES.ADD_COURSE:
        return { ...state, ...payload };
      default:
        return state;
    }
  };