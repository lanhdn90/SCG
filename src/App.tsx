import { NotFound, PrivateRoute } from 'components/Common';
import Home from 'components/Layout/Home';
import LoginPage from 'features/Login/Page/LoginPage';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <PrivateRoute path="/user">
          <Home />
        </PrivateRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
