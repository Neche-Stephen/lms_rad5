// store.js
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';
import logger from 'redux-logger'; 

const middlewares = [];

// Add the logger middleware only in development
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const persistConfig = {
  key: 'root',
  storage,
  blacklist : []
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares) // Apply the middleware array
);

export const persistor = persistStore(store);
export default store;
