import { combineReducers } from 'redux';
import { coursesReducer } from './courses/courses.reducer';
import { subcoursesReducer } from './subcourses/subcourses.reducer';

export const rootReducer = combineReducers({
    courses : coursesReducer,
    subcourses : subcoursesReducer
});