import updateUser from './actions/updateUser';
import queryUser from './actions/queryUser';
import removeUser from './actions/removeUser';

export default {
  updateUser: async (parent, args, context) => {
    await updateUser({
      currentUser: context.user,
      user: args.user,
    });

    return queryUser({ userIdToQuery: args.user._id });
  },
  removeUser: (parent, args, { user }) =>
    removeUser({
      currentUser: user,
      user: args,
    }),
};
