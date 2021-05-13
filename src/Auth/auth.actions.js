import { useHistory } from 'react-router-dom';

import { authConstants } from './constants';
import { authService } from '../services';
import { alertActions } from './';

export const authActions = {
  login,
  logout,
  register
};

//const history = useHistory();

function register(inputs, from, history) {
  return async dispatch => {
    dispatch(request(inputs));

    const { username } = inputs;

    try {
      const user = await authService.isAvailable({ username });
      if (!user) {
        const newUser = await authService.register(inputs);
        if (newUser) {
          dispatch(success());
          dispatch(
            alertActions.success(authConstants.REGISTER_SUCCESS_MESSAGE)
          );
          history.push('/login');
        } else {
          throw authConstants.REGISTER_FAILURE_MESSAGE;
        }
      } else {
        throw `Email  ${username} is already taken`;
      }
    } catch (error) {
      dispatch(failure(error.toString()));
      dispatch(alertActions.error(error.toString()));
    }
  };

  function request(user) {
    return { type: authConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: authConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: authConstants.REGISTER_FAILURE, error };
  }
}

function login({ username, password }, from, history) {
  return async dispatch => {
    dispatch(request({ username }));

    try {
      const user = await authService.login({ username, password });
      if (!user || Object.keys(user).length == 0) {
        throw authConstants.LOGIN_FAILURE_MESSAGE;
      }

      //store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      dispatch(success(user));
      history.push(from);
    } catch (error) {
      dispatch(failure(error.toString()));
      dispatch(alertActions.error(error.toString()));
    }
  };

  function request(user) {
    return { type: authConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: authConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: authConstants.LOGIN_FAILURE, error };
  }
}

function logout(history) {
  return dispatch => {
    authService.logout();
    dispatch({ type: authConstants.LOGOUT });
    history.push('/');
  };
}
