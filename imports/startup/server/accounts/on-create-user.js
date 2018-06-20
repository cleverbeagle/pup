import { Accounts } from 'meteor/accounts-base';
import getOAuthProfile from '../../../modules/get-oauth-profile';
import sendWelcomeEmail from '../../../api/Users/server/send-welcome-email';
import UserSettings from '../../../api/UserSettings/UserSettings';
import getUserSettings from '../../../modules/get-user-settings';

Accounts.onCreateUser((options, user) => {
  const userToCreate = user;
  const OAuthProfile = getOAuthProfile(options.profile, userToCreate);

  if (options.profile) userToCreate.profile = options.profile;
  if (OAuthProfile) sendWelcomeEmail(userToCreate); // Sent for OAuth accounts only here. Sent for password accounts after email verification (https://cleverbeagle.com/pup/v1/accounts/email-verification).

  userToCreate.roles = ['user']; // Set default roles for new sign ups.

  // Add a default settings object for new sign ups (https://cleverbeagle.com/pup/v1/accounts/settings).
  // Set GDPR consent to false by default (https://cleverbeagle.com/pup/v1/accounts/gdpr).
  UserSettings.insert({
    userId: user._id,
    settings: [{
      key: 'canSendMarketingEmails',
      label: 'Can we send you marketing emails?',
      value: false,
      lastUpdatedByUser: null,
      lastUpdatedByAdmin: (new Date()).toString(),
    }],
  });

  return userToCreate;
});
