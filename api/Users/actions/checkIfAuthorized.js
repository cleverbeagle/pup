/* eslint-disable consistent-return */

import { Roles } from 'meteor/alanning:roles';

const isUser = (userId) => {
  try {
    return Roles.userIsInRole(userId, 'user');
  } catch (exception) {
    throw new Error(`[checkIfAuthorized.isUser] ${exception.message}`);
  }
};

const isAdmin = (userId) => {
  try {
    return Roles.userIsInRole(userId, 'admin');
  } catch (exception) {
    throw new Error(`[checkIfAuthorized.isAdmin] ${exception.message}`);
  }
};

const getAuthorizationMethod = (method) => {
  try {
    const authorizationMethods = {
      admin: isAdmin,
      user: isUser,
    };

    const authorizationMethod = authorizationMethods[method];

    if (authorizationMethod) return authorizationMethod;

    throw new Error(`${method} is not defined as an authorization method.`);
  } catch (exception) {
    throw new Error(`[checkIfAuthorized.getAuthorizationMethod] ${exception.message}`);
  }
};

const validateOptions = (options) => {
  try {
    if (!options) throw new Error('options object is required.');
    if (!options.as) throw new Error('options.as is required.');
    if (!options.userId) throw new Error('options.userId is required.');
  } catch (exception) {
    throw new Error(`[checkIfAuthorized.validateOptions] ${exception.message}`);
  }
};

export default (options) => {
  try {
    validateOptions(options);
    const authorized = getAuthorizationMethod(options.as);

    if (authorized(options.userId)) return true;

    throw new Error(
      options.errorMessage || `Sorry, you need to be in the ${options.as} role to do this.`,
    );
  } catch (exception) {
    throw new Error(`[checkIfAuthorized] ${exception.message}`);
  }
};
