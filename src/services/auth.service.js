import { appConstants } from "../constants";

const { host } = appConstants;

export const authService = {
  login,
  logout,
  register,
  isAvailable
};

function login({ username, password }) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  };

  const ignore = encodeURI(
    `{"password":0, "createdAt":0, "updatedAt":0, "__v":0}`
  );

  return fetch(
    `${host}/users?operation=SEARCH&fields=${ignore}`,
    requestOptions
  ).then(handleResponse);
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function register(inputs) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputs)
  };
  return fetch(`${host}/users`, requestOptions).then(handleResponse);
}

function isAvailable(inputs) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputs)
  };

  const ignore = encodeURI(`{"_id":1}`);

  return fetch(
    `${host}/users?operation=SEARCH&fields=${ignore}`,
    requestOptions
  ).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
