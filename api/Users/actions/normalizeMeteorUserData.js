/* eslint-disable consistent-return */

const normalizeGoogleData = (service) => {
  try {
    return {
      service: 'google',
      emails: [{ address: service.email }],
      profile: {
        name: {
          first: service.given_name,
          last: service.family_name,
        },
      },
    };
  } catch (exception) {
    throw new Error(`[normalizeMeteorUserData.normalizeGoogleData] ${exception.message}`);
  }
};

const normalizeGithubData = (service) => {
  try {
    return {
      service: 'github',
      emails: [{ address: service.email }],
      username: service.username,
    };
  } catch (exception) {
    throw new Error(`[normalizeMeteorUserData.normalizeGithubData] ${exception.message}`);
  }
};

const normalizeFacebookData = (service) => {
  try {
    return {
      service: 'facebook',
      emails: [{ address: service.email }],
      profile: {
        name: {
          first: service.first_name,
          last: service.last_name,
        },
      },
    };
  } catch (exception) {
    throw new Error(`[normalizeMeteorUserData.normalizeFacebookData] ${exception.message}`);
  }
};

const normalizeOAuthUserData = (services) => {
  try {
    if (services.facebook) return normalizeFacebookData(services.facebook);
    if (services.github) return normalizeGithubData(services.github);
    if (services.google) return normalizeGoogleData(services.google);
    return {};
  } catch (exception) {
    throw new Error(`[normalizeMeteorUserData.normalizeOAuthUserData] ${exception.message}`);
  }
};

const getNormalizedMeteorUserData = (isOAuthUser, user) => {
  try {
    return isOAuthUser
      ? { _id: user._id, ...normalizeOAuthUserData(user.services), settings: user.settings }
      : { service: 'password', ...user };
  } catch (exception) {
    throw new Error(`[normalizeMeteorUserData.getNormalizedMeteorUserData] ${exception.message}`);
  }
};

const checkIfOAuthUser = (services) => {
  try {
    // NOTE: If services does not exist, we assume it's the current user being passed on the client.
    return !services ? false : !services.password;
  } catch (exception) {
    throw new Error(`[normalizeMeteorUserData.checkIfOAuthUser] ${exception.message}`);
  }
};

const validateOptions = (options) => {
  try {
    if (!options) throw new Error('options object is required.');
    if (!options.user) throw new Error('options.user is required.');
  } catch (exception) {
    throw new Error(`[normalizeMeteorUserData.validateOptions] ${exception.message}`);
  }
};

export default (options) => {
  try {
    validateOptions(options);

    const isOAuthUser = checkIfOAuthUser(options.user.services);
    const normalizedMeteorUserData = getNormalizedMeteorUserData(isOAuthUser, options.user);

    return normalizedMeteorUserData;
  } catch (exception) {
    throw new Error(`[normalizeMeteorUserData] ${exception.message}`);
  }
};
