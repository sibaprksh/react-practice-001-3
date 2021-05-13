import { appConstants, interviewConstants } from '../constants';
import { alertActions } from './';

const { host } = appConstants;

export const interviewActions = {
  create,
  get
};

function get() {
  return async dispatch => {
    dispatch(loading(true));
    const response = await fetch(`${host}/interviews`);
    const interviews = await response.json();
    dispatch(loading(false));
    dispatch(success(interviews));
  };

  function loading(is) {
    return { type: interviewConstants.LOADING, isLoading: is };
  }
  function success(interviews) {
    return { type: interviewConstants.FETCH_ALL_SUCCESS, interviews };
  }
}

function create(data, history) {
  return async dispatch => {
    dispatch(request());
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    return fetch(`${host}/interviews`, requestOptions)
      .then(handleResponse)
      .then(interview => {
        dispatch(success(interview));
        dispatch(alertActions.success(interviewConstants.CREATE_SUCCESS));
        //history.push("/");
        history.go(0);
      });
  };

  function request() {
    return { type: interviewConstants.CREATE_REQUEST };
  }

  function success(interview) {
    return { type: interviewConstants.CREATE_SUCCESS, interview };
  }
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
