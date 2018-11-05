import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import updateUser from './actions/updateUser';
import queryUser from './actions/queryUser';
import removeUser from './actions/removeUser';
import sendWelcomeEmail from './actions/sendWelcomeEmail';

export default {
  updateUser: async (parent, args, context) => {
    await updateUser({
      currentUser: context.user,
      user: args.user,
    });

    return queryUser({ userIdToQuery: args.user._id || context.user._id });
  },
  removeUser: (parent, args, { user }) =>
    removeUser({
      currentUser: user,
      user: args,
    }),
  sendVerificationEmail: (parent, args, context) => {
    Accounts.sendVerificationEmail(context.user._id);

    return {
      _id: context.user._id,
    };
  },
  sendWelcomeEmail: async (parent, args, context) => {
    await sendWelcomeEmail({ user: Meteor.users.findOne(context.user._id) });

    return {
      _id: context.user._id,
    };
  },
};
