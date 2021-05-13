import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// setup fake backend
import { configureFakeBackend } from './services';
configureFakeBackend();

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

import './style.css';

import { App } from './components';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

/*
 Login flow: https://jasonwatmore.com/post/2020/03/02/react-hooks-redux-user-registration-and-login-tutorial-example

 Multiple Steps:
 https://codesandbox.io/s/react-step-builder-demo-j55cn?from-embed=&file=/src/FinalStep.js

 Nested Route
 https://stackblitz.com/edit/react-hook-form-crud-example
 
 TODO:
  1. All static messages move to action - done
  2. nav, router, alert separated from app - done
  3. Homepage- search , list , select - In-progress
*/
