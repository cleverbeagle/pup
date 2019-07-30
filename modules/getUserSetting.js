/* eslint-disable react/no-this-in-sfc */

import { Meteor } from 'meteor/meteor';

export default (key, valueOnly, notCurrentUserId) => {
  if (!key) {
    console.warn('[Pup] Please pass a setting key to retrieve.');
    return null;
  }

  const userId = Meteor.isClient
    ? notCurrentUserId || Meteor.userId()
    : notCurrentUserId || this.userId;

  if (userId && key) {
    const user = Meteor.users.findOne({ _id: userId });
    const foundSetting =
      user && user.settings ? user.settings.find((userSetting) => userSetting.key === key) : null;

    if (foundSetting) {
      return valueOnly ? foundSetting.value : foundSetting;
    }

    return null;
  }

  return null;
};
