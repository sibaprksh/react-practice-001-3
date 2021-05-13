import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Home, Login, Register, Interviews } from '../index';

export default function AppRoute() {
  return (
    <div style={{ paddingTop: '56px' }} className="pl-5 pr-5">
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/interviews" component={Interviews} />
        <HomeRout path="/login" component={Login} />
        <HomeRout path="/register" component={Register} />
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
}

function HomeRout({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem('user')) {
          // logged in so redirect to home
          return <Redirect to={{ pathname: '/' }} />;
        }
        // not logged in so return component
        return <Component {...props} />;
      }}
    />
  );
}

function PrivateRoute({ component: Component, roles, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (!localStorage.getItem('user')) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }

        // logged in so return component
        return <Component {...props} />;
      }}
    />
  );
}
