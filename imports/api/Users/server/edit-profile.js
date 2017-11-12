/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';

let action;

const updateUser = (userId, { emailAddress, profile }) => {
  try {
    Meteor.users.update(userId, {
      $set: {
        'emails.0.address': emailAddress,
        profile,
      },
    });
  } catch (exception) {
    throw new Error(`[editProfile.updateUser] ${exception.message}`);
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
