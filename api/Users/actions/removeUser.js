/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import Documents from '../../Documents/Documents';
import checkIfAuthorized, { isAdmin } from './checkIfAuthorized';

let action;

const deleteUser = ({ _id }) => {
  try {
    return Meteor.users.remove(_id);
  } catch (exception) {
    throw new Error(`[removeUser.deleteUser] ${exception.message}`);
  }
};

const deleteDocuments = ({ _id }) => {
  try {
    return Documents.remove({ owner: _id });
  } catch (exception) {
    throw new Error(`[removeUser.deleteDocuments] ${exception.message}`);
  }
};

const validateOptions = (options) => {
  try {
    if (!options) throw new Error('options object is required.');
    if (!options.currentUser) throw new Error('options.currentUser is required.');
    if (!options.user) throw new Error('options.user is required.');
  } catch (exception) {
    throw new Error(`[removeUser.validateOptions] ${exception.message}`);
  }
};

const removeUser = (options) => {
  try {
    validateOptions(options);
    checkIfAuthorized({
      as: ['admin', () => !options.user._id],
      userId: options.currentUser._id,
      errorMessage: 'Sorry, you need to be an admin or the passed user to do this.',
    });

    const userToRemove = options.user;

    if (!userToRemove._id) userToRemove._id = options.currentUser._id;

    if (userToRemove && !userToRemove._id && !isAdmin(options.currentUser._id)) {
      // NOTE: If passed user doesn't have an _id, we know we're updating the
      // currently logged in user (i.e., via the /profile page).
      userToRemove._id = options.currentUser._id;
    }

    deleteDocuments(userToRemove);
    deleteUser(userToRemove);

    action.resolve();
  } catch (exception) {
    action.reject(`[removeUser] ${exception.message}`);
  }
};

export default (options) =>
  new Promise((resolve, reject) => {
    action = { resolve, reject };
    removeUser(options);
  });
