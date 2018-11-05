/* eslint-disable consistent-return */

const checkForOAuthServices = (user) => {
  try {
    let hasOAuthService = false;
    const oAuthServices = ['facebook', 'google', 'github', 'twitter', 'meetup', 'meteor-developer'];
    Object.keys(user.services).forEach((serviceName) => {
      hasOAuthService = oAuthServices.includes(serviceName); // NOTE: Sets hasOAuthService to true if any oAuthServices match.
    });
    return hasOAuthService;
  } catch (exception) {
    throw new Error(`[isOAuthUser.checkForOAuthServices] ${exception.message}`);
  }
};

const validateOptions = (options) => {
  try {
    if (!options) throw new Error('options object is required.');
    if (!options.user) throw new Error('options.user is required.');
  } catch (exception) {
    throw new Error(`[isOAuthUser.validateOptions] ${exception.message}`);
  }
};

export default (options) => {
  try {
    validateOptions(options);
    return checkForOAuthServices(options.user);
  } catch (exception) {
    throw new Error(`[isOAuthUser] ${exception.message}`);
  }
};
