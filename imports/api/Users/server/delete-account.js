/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Documents from '../../Documents/Documents';

let action;

const deleteUser = (userId) => {
  try {
    return Meteor.users.remove(userId);
  } catch (exception) {
    throw new Error(`[deleteAccount.deleteUser] ${exception.message}`);
  }
};

const deleteDocuments = (userId) => {
  try {
    return Documents.remove({ owner: userId });
  } catch (exception) {
    throw new Error(`[deleteAccount.deleteDocuments] ${exception.message}`);
  }
};

const deleteAccount = ({ userId }, promise) => {
  try {
    action = promise;
    deleteDocuments(userId);
    deleteUser(userId);
    action.resolve();
  } catch (exception) {
    action.reject(exception.message);
  }
};

export default options =>
  new Promise((resolve, reject) =>
    deleteAccount(options, { resolve, reject }));
