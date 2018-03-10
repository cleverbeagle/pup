import { Accounts } from 'meteor/accounts-base';
import getOAuthProfile from '../../../modules/get-oauth-profile';
import sendWelcomeEmail from '../../../api/Users/server/send-welcome-email';

Accounts.onCreateUser((options, user) => {
  const userToCreate = user;
  if (options.profile) userToCreate.profile = options.profile;
  const OAuthProfile = getOAuthProfile(options.profile, user);
  if (OAuthProfile) sendWelcomeEmail(user);
  userToCreate.roles = ['user']; // Set default roles for new sign ups.
  return userToCreate;
});
