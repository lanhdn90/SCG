import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';

export default function UserFeature() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/Dashboard`}>
        <Dashboard />
      </Route>
    </Switch>
  );
}
