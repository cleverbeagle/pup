/* eslint-disable jsx-a11y/no-href */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import Navigation from '../../components/Navigation';

import Authenticated from '../../components/Authenticated';
import Authorized from '../../components/Authorized';
import Public from '../../components/Public';

import Index from '../../pages/Index';

import Documents from '../../pages/Documents';
import NewDocument from '../../pages/NewDocument';
import ViewDocument from '../../pages/ViewDocument';
import EditDocument from '../../pages/EditDocument';

import Profile from '../../pages/Profile';
import Signup from '../../pages/Signup';
import Login from '../../pages/Login';
import Logout from '../../pages/Logout';

import VerifyEmail from '../../pages/VerifyEmail';
import RecoverPassword from '../../pages/RecoverPassword';
import ResetPassword from '../../pages/ResetPassword';

import AdminUsers from '../../pages/AdminUsers';
import AdminUser from '../../pages/AdminUser';
import AdminUserSettings from '../../pages/AdminUserSettings';

import NotFound from '../../pages/NotFound';
import Footer from '../../components/Footer';

import Terms from '../../pages/Terms';
import Privacy from '../../pages/Privacy';
import ExamplePage from '../../pages/ExamplePage';

import VerifyEmailAlert from '../../components/VerifyEmailAlert';
import GDPRConsentModal from '../../components/GDPRConsentModal';

import withTrackerSsr from '../../../modules/withTrackerSsr';
import getUserName from '../../../modules/getUserName';

import Styles from './styles';

class App extends React.Component {
  state = { ready: false, afterLoginPath: null };

  componentDidMount() {
    this.setPageReady();
  }

  setPageReady = () => {
    this.setState({ ready: true });
  };

  setAfterLoginPath = (afterLoginPath) => {
    this.setState({ afterLoginPath });
  };

  render() {
    const { props, state, setAfterLoginPath } = this;
    return (
      <Styles.App ready={this.state.ready} loading={props.loading}>
        {props.authenticated && (
          <VerifyEmailAlert
            userId={props.userId}
            emailVerified={props.emailVerified}
            emailAddress={props.emailAddress}
          />
        )}
        {props.authenticated && <GDPRConsentModal userId={props.userId} />}
        <Navigation {...props} {...state} />
        <Grid>
          <Switch>
            <Route exact name="index" path="/" component={Index} />

            <Authenticated
              exact
              path="/documents"
              component={Documents}
              setAfterLoginPath={setAfterLoginPath}
              {...props}
              {...state}
            />
            {/* <Authenticated
              exact
              path="/documents/new"
              component={NewDocument}
              setAfterLoginPath={setAfterLoginPath}
              {...props}
              {...state}
            /> */}
            <Route exact path="/documents/:_id" component={ViewDocument} />
            <Authenticated
              exact
              path="/documents/:_id/edit"
              component={EditDocument}
              setAfterLoginPath={setAfterLoginPath}
              {...props}
              {...state}
            />

            <Authenticated
              exact
              path="/profile"
              component={Profile}
              setAfterLoginPath={setAfterLoginPath}
              {...props}
              {...state}
            />
            <Public path="/signup" component={Signup} {...props} {...state} />
            <Public path="/login" component={Login} {...props} {...state} />
            <Route
              path="/logout"
              render={(routeProps) => (
                <Logout {...routeProps} setAfterLoginPath={setAfterLoginPath} />
              )}
              {...props}
              {...state}
            />

            <Route name="verify-email" path="/verify-email/:token" component={VerifyEmail} />
            <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
            <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />

            <Route name="terms" path="/terms" component={Terms} />
            <Route name="privacy" path="/privacy" component={Privacy} />
            <Route name="examplePage" path="/example-page" component={ExamplePage} />

            <Authorized
              exact
              allowedRoles={['admin']}
              path="/admin/users"
              pathAfterFailure="/"
              component={AdminUsers}
              setAfterLoginPath={setAfterLoginPath}
              {...props}
              {...state}
            />
            <Authorized
              exact
              allowedRoles={['admin']}
              path="/admin/users/settings"
              pathAfterFailure="/"
              component={AdminUserSettings}
              setAfterLoginPath={setAfterLoginPath}
              {...props}
              {...state}
            />
            <Authorized
              exact
              allowedRoles={['admin']}
              path="/admin/users/:_id"
              pathAfterFailure="/"
              component={AdminUser}
              setAfterLoginPath={setAfterLoginPath}
              {...props}
              {...state}
            />
            <Route component={NotFound} />
          </Switch>
        </Grid>
        <Footer />
      </Styles.App>
    );
  }
}

App.defaultProps = {
  userId: '',
  emailAddress: '',
};

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  emailAddress: PropTypes.string,
  emailVerified: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

// TODO: Completely remove this and rely on GraphQL???

export default withTrackerSsr(() => {
  const app = Meteor.subscribe('app');
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = !app.ready() && !Roles.subscription.ready();
  const name = user && user.profile && user.profile.name && getUserName(user.profile.name);
  const emailAddress = user && user.emails && user.emails[0].address;

  return {
    loading,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    name: name || emailAddress,
    roles: Roles.getRolesForUser(userId),
    userId,
    emailAddress,
    emailVerified: user && user.emails ? user.emails[0] && user.emails[0].verified : true,
  };
})(App);
