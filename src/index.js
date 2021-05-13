import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// setup fake backend
import { configureFakeBackend } from './App/fake.service';
configureFakeBackend();

import { store } from './store';

import './style.css';

import { App } from './App';

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
