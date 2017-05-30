import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
  const userToCreate = user;
  if (options.profile) userToCreate.profile = options.profile;
  return userToCreate;
});
