/* eslint-disable consistent-return */

import { Roles } from 'meteor/alanning:roles';

export const isUser = (userId) => {
  try {
    return Roles.userIsInRole(userId, 'user');
  } catch (exception) {
    throw new Error(`[checkIfAuthorized.isUser] ${exception.message}`);
  }
};

export const isAdmin = (userId) => {
  try {
    return Roles.userIsInRole(userId, 'admin');
  } catch (exception) {
    throw new Error(`[checkIfAuthorized.isAdmin] ${exception.message}`);
  }
};

const getAuthorizationMethods = (methods) => {
  try {
    const authorizationMethods = [];

    const authorizationMethodsMap = {
      admin: isAdmin,
      user: isUser,
    };

    methods.forEach((method) => {
      if (typeof method === 'string') {
        const authorizationMethod = authorizationMethodsMap[method];
        if (authorizationMethod) {
          authorizationMethods.push(authorizationMethod);
        } else {
          throw new Error(`${method} is not defined as an authorization method.`);
        }
      }

      if (typeof method === 'function') authorizationMethods.push(method);
    });

    return authorizationMethods;
  } catch (exception) {
    throw new Error(`[checkIfAuthorized.getAuthorizationMethods] ${exception.message}`);
  }
};

const validateOptions = (options) => {
  try {
    if (!options) throw new Error('options object is required.');
    if (!options.as) throw new Error('options.as is required.');
    if (!(options.as instanceof Array)) {
      throw new Error('options.as must be passed as an array of strings or functions.');
    }
    if (!options.userId) throw new Error('options.userId is required.');
  } catch (exception) {
    throw new Error(`[checkIfAuthorized.validateOptions] ${exception.message}`);
  }
};

export default (options) => {
  try {
    validateOptions(options);
    const authorizationMethods = getAuthorizationMethods(options.as);
    const authorizations = [];

    authorizationMethods.forEach((authorized) => {
      if (authorized(options.userId)) {
        authorizations.push(true);
      } else {
        authorizations.push(false);
      }
    });

    if (!authorizations.includes(true)) {
      throw new Error(options.errorMessage || "Sorry, you're not authorized to do this.");
    }

    return true;
  } catch (exception) {
    throw new Error(`[checkIfAuthorized] ${exception.message}`);
  }
};
