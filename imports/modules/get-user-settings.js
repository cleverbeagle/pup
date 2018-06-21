import { Meteor } from 'meteor/meteor';
import UserSettings from '../api/UserSettings/UserSettings';

export default (setting, notCurrentUserId) => {
  if (!setting) {
    console.warn('[Pup] Please pass a setting key to retrieve.');
    return null;
  }

  const userId = Meteor.isClient ? (notCurrentUserId || Meteor.userId()) : (notCurrentUserId || this.userId);

  if (userId && setting) {
    const userSettings = UserSettings.findOne({ userId });
    const foundSetting = userSettings.find(userSetting => userSetting.key === setting);
    return foundSetting || null;
  }

  return null;
};
