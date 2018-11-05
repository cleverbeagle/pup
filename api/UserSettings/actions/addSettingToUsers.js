/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';

const addSetting = (userIds, settingToAdd) => {
  try {
    userIds.forEach((userId) => {
      Meteor.users.update(
        { _id: userId },
        {
          $addToSet: {
            settings: settingToAdd,
          },
        },
      );
    });
  } catch (exception) {
    throw new Error(`[addSettingToUsers.addSettingToUsers] ${exception.message}`);
  }
};

const getUserIds = () => {
  try {
    return Meteor.users
      .find({}, { fields: { _id: 1 } })
      .fetch()
      .map(({ _id }) => _id);
  } catch (exception) {
    throw new Error(`[addSettingToUsers.getUserIds] ${exception.message}`);
  }
};

const validateOptions = (options) => {
  try {
    if (!options) throw new Error('options object is required.');
    if (!options.setting) throw new Error('options.setting is required.');
  } catch (exception) {
    throw new Error(`[addSettingToUsers.validateOptions] ${exception.message}`);
  }
};

export default (options) => {
  try {
    validateOptions(options);
    const userIds = getUserIds();
    return addSetting(userIds, options.setting);
  } catch (exception) {
    throw new Error(`[addSettingToUsers] ${exception.message}`);
  }
};
