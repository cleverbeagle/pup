/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';

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

export default (setting) => {
  try {
    const userIds = getUserIds();

    userIds.forEach((userId) => {
      Meteor.users.update(
        { _id: userId },
        {
          $addToSet: {
            settings: setting,
          },
        },
      );
    });
  } catch (exception) {
    throw new Error(`[addSettingToUsers] ${exception.message}`);
  }
};
