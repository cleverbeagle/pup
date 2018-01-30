/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import _ from 'lodash';

let action;

const updateUser = (userId, { emailAddress, profile }) => {
  const currentProfile = Meteor.users.findOne({ _id: userId });
  const currentEmail = _.get(currentProfile, 'emails.0.address', '');

  if (currentEmail.toLowerCase() !== emailAddress.toLowerCase()) {
    Accounts.addEmail(userId, emailAddress);
    Accounts.removeEmail(userId, currentEmail);
  }

  try {
    Meteor.users.update(userId, {
      $set: {
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
    action.resolve();
  } catch (exception) {
    action.reject(exception.message);
  }
};

export default options =>
  new Promise((resolve, reject) =>
    editProfile(options, { resolve, reject }));
