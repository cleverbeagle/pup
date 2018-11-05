/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';

const getUpdatedUserSettings = (existingUserSettings, newSetting) => {
  try {
    const userSettings = [...existingUserSettings];
    const userSettingToUpdate = userSettings.find(
      (settingOnUser) => settingOnUser._id === newSetting._id,
    ); // eslint-disable-line

    if (userSettingToUpdate) {
      userSettingToUpdate.isGDPR = newSetting.isGDPR;
      userSettingToUpdate.type = newSetting.type;
      userSettingToUpdate.value = newSetting.value;
      userSettingToUpdate.key = newSetting.key;
      userSettingToUpdate.label = newSetting.label;
    }

    return userSettings;
  } catch (exception) {
    throw new Error(`[updateSettingOnUsers.getUpdatedUserSettings] ${exception.message}`);
  }
};

const updateUsersSettings = (users, updatedSetting) => {
  try {
    users.forEach(({ _id, settings }) => {
      const userSettings = getUpdatedUserSettings(settings, updatedSetting);
      Meteor.users.update({ _id }, { $set: { settings: userSettings } });
    });
  } catch (exception) {
    throw new Error(`[updateSettingOnUsers.updateUsersSettings] ${exception.message}`);
  }
};

const getUsers = () => {
  try {
    return Meteor.users.find({}, { fields: { _id: 1, settings: 1 } }).fetch();
  } catch (exception) {
    throw new Error(`[updateSettingOnUsers.getUsers] ${exception.message}`);
  }
};

export default (setting) => {
  try {
    const users = getUsers();
    updateUsersSettings(users, setting);
  } catch (exception) {
    throw new Error(`[updateSettingOnUsers] ${exception.message}`);
  }
};
