import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import getUser from './getUser';

export default {
  updateUser(root, args, { user }) {
    if (!user || (!Roles.userIsInRole(user._id, 'admin') && user._id !== args.user._id)) {
      throw new Error('Sorry, you must be an admin or this user to perform this update.');
    }

    if (args.user.password) Accounts.setPassword(args.user._id, args.user.password);
    if (args.user.roles.length) Roles.setUserRoles(args.user._id, args.user.roles);
    if (args.user.email || args.user.profile) {
      console.log(args);
      Meteor.users.update(args.user._id, {
        $set: {
          'emails.0.address': args.user.email,
          'profile.name.first': args.user.profile.name.first,
          'profile.name.last': args.user.profile.name.last,
        },
      });
    }

    return getUser({ operation: 'findOne', query: { _id: args.user._id } });
  },
  removeUser(root, args, { user }) {
    if (!user || (!Roles.userIsInRole(user._id, 'admin') && user._id !== args._id)) {
      throw new Error('Sorry, you must be an admin or this user to perform this update.');
    }

    Meteor.users.remove(args);

    return args;
  },
};
