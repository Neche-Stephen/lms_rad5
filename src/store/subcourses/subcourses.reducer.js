import SUBCOURSES_ACTION_TYPES from "./subcourses.types";

export const SUBCOURSES_INITIAL_STATE = {
  
}


export const subcoursesReducer = (state = SUBCOURSES_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
  
    switch (type) {
      case SUBCOURSES_ACTION_TYPES.ADD_SUBCOURSE_NAME:
        return { ...state, ...payload };
      default:
        return state;
    }
  };