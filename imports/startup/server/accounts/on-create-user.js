import { Accounts } from 'meteor/accounts-base';
import sendWelcomeEmail from '../../../api/Users/server/send-welcome-email';

Accounts.onCreateUser((options, user) => {
  const userToCreate = user;
  if (options.profile) userToCreate.profile = options.profile;
  sendWelcomeEmail(options, user);
  userToCreate.roles = ['user']; // Set default roles for new sign ups.
  return userToCreate;
});
