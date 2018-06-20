import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import handleMethodException from '../../modules/handle-method-exception';
import getOAuthProfile from '../../modules/get-oauth-profile';
import getUserProfile from '../../modules/get-user-profile';

const fetchUsers = (query, projection) => {
  return Meteor.users.find(query, projection).fetch().map(user => getUserProfile(user));
};

Meteor.methods({
  'admin.fetchUsers': function adminFetchUsers(options) {
    check(options, Match.Maybe(Object));

    try {
      if (Roles.userIsInRole(this.userId, 'admin')) {
        const skip = ((options.currentPage * options.perPage) - options.perPage);
        const searchRegex = options.search ? new RegExp(options.search, 'i') : null;
        const sort = {
          'profile.name.last': 1,
          'services.facebook.first_name': 1,
          'services.google.name': 1,
          'services.github.username': 1,
        };

        return {
          total: Meteor.users.find({ _id: { $ne: this.userId } }).count(),
          users: options.search ? fetchUsers({
            _id: { $ne: this.userId },
            $or: [
              { 'profile.name.first': searchRegex },
              { 'profile.name.last': searchRegex },
              { 'emails.address': searchRegex },
              { 'services.facebook.first_name': searchRegex },
              { 'services.facebook.last_name': searchRegex },
              { 'services.facebook.email': searchRegex },
              { 'services.google.name': searchRegex },
              { 'services.google.email': searchRegex },
              { 'services.github.email': searchRegex },
              { 'services.github.username': searchRegex },
            ],
          }, { sort }) : fetchUsers({ _id: { $ne: this.userId } }, { limit: options.perPage, skip, sort }),
        };
      }

      return [];
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'admin.createUser': function adminCreateUser(user) {
    check(user, {
      _id: Match.Optional(String),
      email: String,
      password: String,
      profile: {
        name: {
          first: String,
          last: String,
        },
      },
      roles: [String],
    });

    try {
      if (Roles.userIsInRole(this.userId, 'admin')) {
        const userId = Accounts.createUser({
          email: user.email,
          password: user.password,
          profile: user.profile,
        });

        if (user.roles.length) Roles.setUserRoles(userId, user.roles);
        return userId;
      }

      throw new Meteor.Error('403', 'Sorry, you need to be an administrator to do this.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'admin.editUser': function adminEditUser(user) {
    check(user, {
      _id: String,
      email: Match.Maybe(String),
      password: Match.Maybe(String),
      profile: Match.Maybe({
        name: {
          first: Match.Maybe(String),
          last: Match.Maybe(String),
        },
      }),
      roles: [String],
    });

    try {
      if (Roles.userIsInRole(this.userId, 'admin')) {
        if (user.password) Accounts.setPassword(user._id, user.password);
        if (user.roles.length) Roles.setUserRoles(user._id, user.roles);
        if (user.email || user.profile) {
          return Meteor.users.update(user._id, {
            $set: {
              'emails.0.address': user.email,
              'profile.name.first': user.profile.name.first,
              'profile.name.last': user.profile.name.last,
            },
          });
        }

        return true;
      }

      throw new Meteor.Error('403', 'Sorry, you need to be an administrator to do this.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});
