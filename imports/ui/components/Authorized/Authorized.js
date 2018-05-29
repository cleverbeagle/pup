import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

class Authorized extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authorized: false };
    autoBind(this);
  }

  componentDidMount() {
    this.checkIfAuthorized();
  }

  componentDidUpdate() {
    this.checkIfAuthorized();
  }

  checkIfAuthorized() {
    const { loading, userRoles, userIsInRoles } = this.props;

    if (!loading && userRoles.length > 0) {
      if (!userIsInRoles) {
        this.props.history.push('/login');
      } else {
        // Check to see if authorized is still false before setting. This prevents the infinite loop
        // the linter is anticipating when this is used within componentDidUpdate.
        if (!this.state.authorized) this.setState({ authorized: true }); // eslint-disable-line
      }
    }
  }

  render() {
    const {
      allowedRoles, group, userId, loggingIn, authenticated, component, path, exact, ...rest
    } = this.props;

    return this.state.authorized ? (
      <Route
        path={path}
        exact={exact}
        render={props => (
          React.createElement(component, {
            ...props, ...rest, loggingIn, authenticated,
          })
        )}
      />
    ) : <div />;
  }
}

Authorized.defaultProps = {
  group: null,
  userId: null,
  exact: false,
  userRoles: [],
  userIsInRoles: false,
};

Authorized.propTypes = {
  allowedRoles: PropTypes.array.isRequired,
  group: PropTypes.string,
  userId: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  setAfterLoginPath: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  userRoles: PropTypes.array,
  userIsInRoles: PropTypes.bool,
};

export default withRouter(withTracker(({ allowedRoles }) => { // eslint-disable-line
  return Meteor.isClient ? {
    loading: Meteor.isClient ? !Roles.subscription.ready() : true,
    userRoles: Roles.getRolesForUser(Meteor.userId()),
    userIsInRoles: Roles.userIsInRole(Meteor.userId(), allowedRoles),
  } : {};
})(Authorized));
