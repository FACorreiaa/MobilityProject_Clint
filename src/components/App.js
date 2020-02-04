import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../actions/authActions';
import { Provider } from 'react-redux';
import store from '../store';
import Navbar from '../components/Navbar/Navbar';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';

import routesConfig from './PrivateRoute/routesConfig';

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = './searchVehicles';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Navbar />

            <Switch>
              {routesConfig.routes.map(({ component, roles, url }) =>
                roles.length ? (
                  <PrivateRoute
                    exact
                    path={url}
                    component={component}
                    roles={roles}
                  />
                ) : (
                  <Route exact path={url} component={component} />
                )
              )}
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
