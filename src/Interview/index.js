import React from 'react';
import { Route, Switch } from 'react-router-dom';

import List from './list';
import Create from './create';

import interviewReducer from './interview.reducer';

function Interviews({ match }) {
  const { path } = match;

  return (
    <Switch>
      <Route exact path={path} component={List} />
      <Route path={`${path}/create`} component={Create} />
      <Route path={`${path}/edit/:id`} component={Create} />
    </Switch>
  );
}

export { Interviews, interviewReducer };
