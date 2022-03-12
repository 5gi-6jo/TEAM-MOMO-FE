import { configureStore } from '@reduxjs/toolkit';
import userReducer from './modules/user';
import imageReducer from './modules/image';
import { createBrowserHistory } from 'history';
import logger from 'redux-logger';

export const history = createBrowserHistory();

export const store = configureStore({
  reducer: { image: imageReducer, user: userReducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});
