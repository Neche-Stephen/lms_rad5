import { combineReducers } from 'redux';
import { coursesReducer } from './courses/courses.reducer';

export const rootReducer = combineReducers({
    courses : coursesReducer
});