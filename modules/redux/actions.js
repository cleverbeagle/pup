import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import getUserName from '../get-user-name';

export function onLogin() {
  return (dispatch) => {
    const loggingIn = Meteor.loggingIn();
    const user = Meteor.user();
    const userId = Meteor.userId();
    const name = user && user.profile && user.profile.name && getUserName(user.profile.name);
    const emailAddress = user && user.emails && user.emails[0].address;

    dispatch({
      type: 'ON_LOGIN',
      loading: false,
      loggingIn,
      authenticated: !loggingIn && !!userId,
      name: name || emailAddress,
      roles: Roles.getRolesForUser(userId),
      userId,
      emailAddress,
      emailVerified: user && user.emails ? user && user.emails && user.emails[0].verified : true,
    });
  };
}

export function onLogout() {
  return (dispatch) => {
    dispatch({
      type: 'ON_LOGOUT',
      loading: false,
      loggingIn: false,
      authenticated: false,
      name: '',
      roles: [],
      userId: null,
      emailAddress: '',
      emailVerified: false,
    });
  };
}
