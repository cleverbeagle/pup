// https://cleverbeagle.com/pup/v1/accounts/user-settings

import UserSettings from '../../../api/UserSettings/UserSettings';

const defaultUserSettings = [{
  isGDPR: true,
  key: 'canSendMarketingEmails',
  label: 'Can we send you marketing emails?',
  type: 'boolean',
  value: 'false', // Pass a string and allow schema to convert to a Boolean for us.
}];

defaultUserSettings.forEach((setting) => {
  if (!UserSettings.findOne({ key: setting.key })) {
    UserSettings.insert(setting);
  }
});
