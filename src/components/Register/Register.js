import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { _set } from "../../utils";
import { authActions } from "../../actions";

export default function Register() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    name: {
      first: "",
      last: ""
    }
  });

  const [isSubmitted, setSubmitted] = useState(false);
  const loading = useSelector(state => state.auth.registering);

  function handleChange(e) {
    const {
      target: { name, value }
    } = e;

    setInputs(inputs => ({ ..._set(inputs, name, value) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);

    if (
      inputs.username &&
      inputs.name.first &&
      inputs.name.last &&
      inputs.password
    ) {
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: "/" } };
      dispatch(authActions.register(inputs, from, history));
    }
  }

  const { name, username, password } = inputs;

  return (
    <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-6 offset-sm-3 pt-5">
      <div className="card">
        <div className="card-header">
          <h3> Sign Up !! </h3>
        </div>
        <div className="card-body">
          <form name="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>First name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                name="name.first"
                value={name.first}
                onChange={handleChange}
                className={
                  "form-control" +
                  (isSubmitted && !name.first ? " is-invalid" : "")
                }
              />
              {isSubmitted && !name.first && (
                <div className="invalid-feedback">First name is required</div>
              )}
            </div>

            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                name="name.last"
                value={name.last}
                onChange={handleChange}
                className={
                  "form-control" +
                  (isSubmitted && !name.last ? " is-invalid" : "")
                }
              />
              {isSubmitted && !name.last && (
                <div className="invalid-feedback">Last name is required</div>
              )}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="username"
                value={username}
                onChange={handleChange}
                className={
                  "form-control" +
                  (isSubmitted && !username ? " is-invalid" : "")
                }
              />
              {isSubmitted && !username && (
                <div className="invalid-feedback">Email is required</div>
              )}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={handleChange}
                className={
                  "form-control" +
                  (isSubmitted && !password ? " is-invalid" : "")
                }
              />
              {isSubmitted && !password && (
                <div className="invalid-feedback">Password is required</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              {loading && (
                <span className="spinner-border spinner-border-sm mr-1" />
              )}
              Sign Up
            </button>
            <div className="forgot-password text-right">
              <Link to="/login">Sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
