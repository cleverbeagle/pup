import { Roles } from 'meteor/alanning:roles';
import UserSettings from './UserSettings';

export default {
  userSettings: (parent, args, { user }) => {
    if (!user || !Roles.userIsInRole(user._id, 'admin')) {
      throw new Error('Sorry, you need to be an administrator to do this.');
    }

    return UserSettings.find({}, { sort: { key: 1 } }).fetch();
  },
};
