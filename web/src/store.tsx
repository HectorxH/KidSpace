import { configureStore } from '@reduxjs/toolkit';
import loggedinReducer from './slices/loggedin';
import userReducer from './slices/user';

export default configureStore({
  reducer: {
    loggedin: loggedinReducer,
    user: userReducer,
  },
});
