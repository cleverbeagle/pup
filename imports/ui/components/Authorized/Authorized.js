import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';

class Authorized extends React.Component {
  componentWillMount() {
    if (Meteor.isClient) this.props.setAfterLoginPath(`${window.location.pathname}${window.location.search}`);
  }

  render() {
    const {
      allowed, server, group, userId, loggingIn, authenticated, component, path, exact, ...rest
    } = this.props;

    return (
      <Route
        path={path}
        exact={exact}
        render={props => {
          return (
            (authenticated && Roles.userIsInRole(userId, allowed, group)) ?
              (React.createElement(component, { ...props, ...rest, loggingIn, authenticated })) :
              (<Redirect to="/login" />)
          );
        }}
      />
    );
  }
}

Authorized.defaultProps = {
  group: null,
  userId: null,
  exact: false,
};

Authorized.propTypes = {
  roles: PropTypes.array.isRequired,
  group: PropTypes.string,
  userId: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  setAfterLoginPath: PropTypes.func.isRequired,
};

export default Authorized;
