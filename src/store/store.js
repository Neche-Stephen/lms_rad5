// store.js
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './root-reducer';
import logger from 'redux-logger'; 

const middlewares = [];

// Add the logger middleware only in development
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares) // Apply the middleware array
);


export default store;
