import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { interviewReducer } from './Interview';
import { alertReducer } from './Alert';
import { authReducer } from './Auth';

const rootReducer = combineReducers({
  alertReducer,
  authReducer,
  interviewReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
