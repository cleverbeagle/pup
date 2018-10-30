import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import UserSettings from './UserSettings';
import updateSettingOnUsers from './updateSettingOnUsers';
import addSettingToUsers from './addSettingToUsers';

export default {
  addUserSetting(parent, { setting }, { user }) {
    if (!Roles.userIsInRole(user._id, 'admin')) {
      throw new Error('Sorry, you must be an admin to do this.');
    }

    if (UserSettings.findOne({ key: setting.key })) {
      throw new Error('Sorry, this user setting already exists.');
    }

    const settingId = UserSettings.insert(setting);
    addSettingToUsers({ _id: settingId, ...setting });

    return {
      _id: settingId,
      ...setting,
    };
  },
  updateUserSetting(parent, { setting }, { user }) {
    if (!Roles.userIsInRole(user._id, 'admin')) {
      throw new Error('Sorry, you must be an admin to do this.');
    }

    UserSettings.update(
      { _id: setting._id },
      {
        $set: setting,
      },
      () => {
        updateSettingOnUsers(setting);
      },
    );
  },
  removeUserSetting(parent, { _id }, { user }) {
    if (!Roles.userIsInRole(user._id, 'admin')) {
      throw new Error('Sorry, you must be an admin to do this.');
    }

    Meteor.users.update({}, { $pull: { settings: { _id } } }, { multi: true }, () => {
      UserSettings.remove({ _id });
    });

    return { _id };
  },
};
