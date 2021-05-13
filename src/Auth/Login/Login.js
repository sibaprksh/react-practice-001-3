import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { authActions } from '../actions';

import './Login.css';

export default function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  const { username, password } = inputs;

  const {loggingIn: loading} = useSelector(state => state.authReducer);

  const [isSubmitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const {
      target: { name, value }
    } = e;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);

    if (username && password) {
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: '/' } };
      dispatch(authActions.login(inputs, from, history));
    }
  }

  return (
    <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-6 offset-sm-3 pt-5">
      <div className="card">
        <div className="card-header">
          <h3> Login !! </h3>
        </div>
        <div className="card-body">
          <form name="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                className={
                  'form-control' +
                  (isSubmitted && !username ? ' is-invalid' : '')
                }
              />
              {isSubmitted && !username && (
                <div className="invalid-feedback">Username is required</div>
              )}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                className={
                  'form-control' +
                  (isSubmitted && !password ? ' is-invalid' : '')
                }
              />
              {isSubmitted && !password && (
                <div className="invalid-feedback">Password is required</div>
              )}
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                {loading && (
                  <span className="spinner-border spinner-border-sm mr-1" />
                )}
                Login
              </button>

              <p className="text-right">
                <Link to="/register">New Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
