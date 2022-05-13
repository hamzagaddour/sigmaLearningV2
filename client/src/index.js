import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import {getUsers} from './actions/users.actions'
import { getCourse } from './actions/course.actions';

const container = document.getElementById('root');
const root = createRoot(container);
store.dispatch(getUsers())
store.dispatch(getCourse())

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

