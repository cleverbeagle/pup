import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

class Authenticated extends React.Component {
  componentWillMount() {
    this.props.setAfterLoginPath(`${window.location.pathname}${window.location.search}`);
  }

  render() {
    const {
      loggingIn, authenticated, component, path, exact, ...rest
    } = this.props;

    return (
      <Route
        path={path}
        exact={exact}
        render={props => (
          authenticated ?
            (React.createElement(component, {
              ...props, ...rest, loggingIn, authenticated,
            })) :
            (<Redirect to="/login" />)
        )}
      />
    );
  }
}

Authenticated.defaultProps = {
  path: '',
  exact: false,
};

Authenticated.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  setAfterLoginPath: PropTypes.func.isRequired,
  path: PropTypes.string,
  exact: PropTypes.bool,
};

export default Authenticated;
