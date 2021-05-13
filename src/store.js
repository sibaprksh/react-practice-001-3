import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { interviewReducer } from './components/Interview';
import { alertReducer, authReducer } from './reducers';

const rootReducer = combineReducers({
  alertReducer,
  authReducer,
  interviewReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
