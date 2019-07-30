import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

class Authorized extends React.Component {
  state = { authorized: false };

  componentDidMount() {
    this.checkIfAuthorized();
  }

  componentDidUpdate() {
    this.checkIfAuthorized();
  }

  checkIfAuthorized = () => {
    const { history, loading, userId, userRoles, userIsInRoles, pathAfterFailure } = this.props;

    if (!userId) history.push(pathAfterFailure || '/');

    if (!loading && userRoles.length > 0) {
      if (!userIsInRoles) {
        history.push(pathAfterFailure || '/');
      } else {
        // Check to see if authorized is still false before setting. This prevents an infinite loop
        // when this is used within componentDidUpdate.
        if (!this.state.authorized) this.setState({ authorized: true }); // eslint-disable-line
      }
    }
  };

  render() {
    const { component, path, exact, ...rest } = this.props;
    const { authorized } = this.state;

    return authorized ? (
      <Route
        path={path}
        exact={exact}
        render={(props) => React.createElement(component, { ...rest, ...props })}
      />
    ) : (
      <div />
    );
  }
}

Authorized.defaultProps = {
  allowedGroup: null,
  userId: null,
  exact: false,
  userRoles: [],
  userIsInRoles: false,
  pathAfterFailure: '/login',
};

Authorized.propTypes = {
  loading: PropTypes.bool.isRequired,
  allowedRoles: PropTypes.array.isRequired,
  allowedGroup: PropTypes.string,
  userId: PropTypes.string,
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  history: PropTypes.object.isRequired,
  userRoles: PropTypes.array,
  userIsInRoles: PropTypes.bool,
  pathAfterFailure: PropTypes.string,
};

export default withRouter(
  withTracker(({ allowedRoles, allowedGroup }) =>
    // eslint-disable-line
    Meteor.isClient
      ? {
          loading: Meteor.isClient ? !Roles.subscription.ready() : true,
          userId: Meteor.userId(),
          userRoles: Roles.getRolesForUser(Meteor.userId()),
          userIsInRoles: Roles.userIsInRole(Meteor.userId(), allowedRoles, allowedGroup),
        }
      : {},
  )(Authorized),
);
