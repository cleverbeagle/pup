/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import mapMeteorUserToSchema from './mapMeteorUserToSchema';

let action;

const getUser = (userId) => {
  try {
    return Meteor.users.findOne(userId);
  } catch (exception) {
    throw new Error(`[queryUser.getUser] ${exception.message}`);
  }
};

const validateOptions = (options) => {
  try {
    if (!options) throw new Error('options object is required.');
    if (!options.userIdToQuery) throw new Error('options.userIdToQuery is required.');
  } catch (exception) {
    throw new Error(`[queryUser.validateOptions] ${exception.message}`);
  }
};

const queryUser = (options) => {
  try {
    validateOptions(options);
    const user = getUser(options.userIdToQuery);
    action.resolve(mapMeteorUserToSchema({ user }));
  } catch (exception) {
    action.reject(`[queryUser] ${exception.message}`);
  }
};

export default (options) =>
  new Promise((resolve, reject) => {
    action = { resolve, reject };
    queryUser(options);
  });
