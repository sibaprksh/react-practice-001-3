import React, { useState, useRef, useEffect } from 'react';

import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { authActions } from '../Auth';

export default function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const innerRef = useOuterClick(hide);

  const { user } = useSelector(state => state.authReducer);
  const [isVisible, setVisibility] = useState(false);

  useEffect(hide, [location]);

  function show() {
    setVisibility(true);
  }
  function hide() {
    setVisibility(false);
  }
  function logout() {
    dispatch(authActions.logout(history));
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark fixed-top pl-5 pr-5">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <div className="mr-auto" />
        {user && Object.keys(user).length ? (
          <div ref={innerRef}>
            <a className="navbar-text" onClick={show}>
              {user?.name?.first}
            </a>
            <ul
              className={
                'dropdown-menu dropdown-menu-right mr-5 ' +
                (isVisible ? 'show' : '')
              }
            >
              <Link className="dropdown-item" to="/register">
                Edit Profile
              </Link>
              <a className="dropdown-item" onClick={logout}>
                Logout
              </a>
            </ul>
          </div>
        ) : null}
      </nav>
    </>
  );
}

function useOuterClick(callback) {
  const callbackRef = useRef(); // initialize mutable callback ref
  const innerRef = useRef(); // returned to client, who sets the "border" element

  // update callback on each render, so second useEffect has most recent callback
  useEffect(() => {
    callbackRef.current = callback;
  });
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
    function handleClick(e) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      )
        callbackRef.current(e);
    }
  }, []); // no dependencies -> stable click listener

  return innerRef; // convenience for client (doesn't need to init ref himself)
}
