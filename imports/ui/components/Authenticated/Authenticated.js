import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const Authenticated = ({ loggingIn, authenticated, component, path, exact, ...rest }) => (
  <Route
    path={path}
    exact={exact}
    render={props => (
      authenticated ?
        (React.createElement(component, { ...props, ...rest, loggingIn, authenticated })) :
        (<Redirect to="/login" />)
    )}
  />
);

Authenticated.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

export default Authenticated;
