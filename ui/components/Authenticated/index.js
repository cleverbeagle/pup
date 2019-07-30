import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

class Authenticated extends React.Component {
  componentWillMount() {
    if (Meteor.isClient) {
      const { setAfterLoginPath } = this.props;
      setAfterLoginPath(`${window.location.pathname}${window.location.search}`);
    }
  }

  render() {
    const { loggingIn, authenticated, component, path, exact, ...rest } = this.props;

    return (
      <Route
        path={path}
        exact={exact}
        render={(props) =>
          authenticated ? (
            React.createElement(component, {
              ...props,
              ...rest,
              loggingIn,
              authenticated,
            })
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }
}

Authenticated.defaultProps = {
  loggingIn: false,
  path: '',
  exact: false,
};

Authenticated.propTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  setAfterLoginPath: PropTypes.func.isRequired,
  path: PropTypes.string,
  exact: PropTypes.bool,
};

export default Authenticated;
