import { Meteor } from 'meteor/meteor';
import UserSettings from './UserSettings';
import { isAdmin } from '../Users/actions/checkIfAuthorized';
import updateSettingOnUsers from './actions/updateSettingOnUsers';
import addSettingToUsers from './actions/addSettingToUsers';

export default {
  addUserSetting(parent, args, context) {
    if (!isAdmin(context.user._id)) {
      throw new Error('Sorry, you must be an admin to do this.');
    }

    if (UserSettings.findOne({ key: args.setting.key })) {
      throw new Error('Sorry, this user setting already exists.');
    }

    const settingId = UserSettings.insert(args.setting);
    addSettingToUsers({ _id: settingId, ...args.setting });

    return {
      _id: settingId,
      ...args.setting,
    };
  },
  updateUserSetting(parent, args, context) {
    if (!isAdmin(context.user._id)) {
      throw new Error('Sorry, you must be an admin to do this.');
    }

    UserSettings.update(
      { _id: args.setting._id },
      {
        $set: args.setting,
      },
      () => {
        updateSettingOnUsers({ setting: args.setting });
      },
    );
  },
  removeUserSetting(parent, args, context) {
    if (!isAdmin(context.user._id)) {
      throw new Error('Sorry, you must be an admin to do this.');
    }

    Meteor.users.update({}, { $pull: { settings: { _id: args._id } } }, { multi: true }, () => {
      UserSettings.remove({ _id: args._id });
    });

    return { _id: args._id };
  },
};
