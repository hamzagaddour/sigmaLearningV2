import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user';
import usersReducer from '../features/users';
import courseReducer from '../features/course'
import chapterReducer from '../features/chapter'

export const store = configureStore({
  reducer: {
    user : userReducer,
    users : usersReducer,
    course : courseReducer,
    chapter: chapterReducer
  },
});
