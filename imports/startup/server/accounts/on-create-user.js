import { Accounts } from 'meteor/accounts-base';
import getOAuthProfile from '../../../modules/get-oauth-profile';
import sendWelcomeEmail from '../../../api/Users/server/send-welcome-email';
import UserSettings from '../../../api/UserSettings/UserSettings';

Accounts.onCreateUser((options, user) => {
  const userToCreate = user;
  const OAuthProfile = getOAuthProfile(options.profile, userToCreate);

  if (options.profile) userToCreate.profile = options.profile;
  if (OAuthProfile) sendWelcomeEmail(userToCreate); // Sent for OAuth accounts only here. Sent for password accounts after email verification (https://cleverbeagle.com/pup/v1/accounts/email-verification).

  userToCreate.roles = ['user']; // Set default roles for new sign ups.

  // Add a default settings array for new sign ups (https://cleverbeagle.com/pup/v1/accounts/settings).
  const settings = UserSettings.find().fetch();
  userToCreate.settings = settings;

  return userToCreate;
});
