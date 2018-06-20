import { Meteor } from 'meteor/meteor';
import UserSettings from '../api/UserSettings/UserSettings';

export default (setting) => {
  if (!setting) {
    console.warn('[Pup] Please pass a setting key to retrieve.');
    return null;
  }

  let userId;

  if (Meteor.isClient) userId = Meteor.userId();
  if (Meteor.isServer) userId = this.userId; // eslint-disable-line

  if (userId && setting) {
    const userSettings = UserSettings.findOne({ userId });
    const foundSetting = userSettings.find(userSetting => userSetting.key === setting);
    return foundSetting || null;
  }

  return null;
};
