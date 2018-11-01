import updateUser from './actions/updateUser';
import queryUser from './actions/queryUser';

export default {
  updateUser: async (parent, args, context) => {
    await updateUser({
      currentUser: context.user,
      user: args.user,
    });

    return queryUser({ userIdToQuery: args.user._id });
  },
  removeUser: (parent, args, { user }) => {
    if (!user || args.user._id !== user._id) {
      throw new Error('Sorry, users can only remove themselves.');
    }

    console.log(args);
  },
};
