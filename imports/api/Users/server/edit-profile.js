/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

let action;

const updatePassword = (userId, newPassword) => {
  try {
    throw new Meteor.Error('500', 'Testing failures.');
    Accounts.setPassword(userId, newPassword, { logout: false });
  } catch (exception) {
    action.reject(`[editProfile.updatePassword] ${exception}`);
  }
};

const updateUser = (userId, { emailAddress, profile }) => {
  try {
    Meteor.users.update(userId, {
      $set: {
        'emails.0.address': emailAddress,
        profile,
      },
    });
  } catch (exception) {
    action.reject(`[editProfile.updateUser] ${exception}`);
  }
};

const editProfile = ({ userId, profile }, promise) => {
  try {
    action = promise;

    updateUser(userId, profile);
    if (profile.password) updatePassword(userId, profile.password);
  } catch (exception) {
    action.reject(`[editProfile.handler] ${exception}`);
  }
};


export default options =>
new Promise((resolve, reject) =>
editProfile(options, { resolve, reject }));
