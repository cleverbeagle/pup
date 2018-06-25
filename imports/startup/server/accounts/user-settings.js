// https://cleverbeagle.com/pup/v1/accounts/settings

import UserSettings from '../../../api/UserSettings/UserSettings';

const defaultUserSettings = [{
  isGDPR: true,
  key: 'canSendMarketingEmails',
  label: 'Can we send you marketing emails?',
  type: 'boolean',
  value: 'false',
}];

defaultUserSettings.forEach((setting) => {
  UserSettings.upsert({ key: setting.key }, {
    $set: setting,
  });
});
