import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { auth } from './auth.reducer';
//import { app } from './app.reducer';
import { interview } from './interview.reducer';

const rootReducer = combineReducers({
  alert,
  auth,
  interview
});

export default rootReducer;
