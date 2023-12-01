import { combineReducers } from 'redux';
import { coursesReducer } from './courses/courses.reducer';
import { subcoursesReducer } from './subcourses/subcourses.reducer';
import { studentCoursesReducer } from './studentCourses/sCourses.reducer';
import { studentSubcoursesReducer } from './studentSubCourses/subcourses.reducer';

export const rootReducer = combineReducers({
    courses : coursesReducer,
    subcourses : subcoursesReducer,
    studentCourses : studentCoursesReducer,
    studentSubcourses : studentSubcoursesReducer
});