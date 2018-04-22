import { Accounts } from 'meteor/accounts-base';
import getOAuthProfile from '../../../modules/get-oauth-profile';
import sendWelcomeEmail from '../../../api/Users/server/send-welcome-email';

Accounts.onCreateUser((options, user) => {
  const userToCreate = user;
  if (options.profile) userToCreate.profile = options.profile;
  const OAuthProfile = getOAuthProfile(options.profile, userToCreate);
  if (OAuthProfile) sendWelcomeEmail(userToCreate); // Sent for OAuth accounts only here. Sent for password accounts after email verification (https://cleverbeagle.com/pup/v1/accounts/email-verification).
  userToCreate.roles = ['user']; // Set default roles for new sign ups.
  return userToCreate;
});
