const parseGoogleData = service => ({
  service: 'google',
  emails: [
    { address: service.email },
  ],
  profile: {
    name: {
      first: service.given_name,
      last: service.family_name,
    },
  },
});

const parseGithubData = service => ({
  service: 'github',
  emails: [
    { address: service.email },
  ],
  username: service.username,
  // profile: {
  //   name: {
  //     first: service.username,
  //     last: '',
  //   },
  // },
});

const parseFacebookData = service => ({
  service: 'facebook',
  emails: [
    { address: service.email },
  ],
  profile: {
    name: {
      first: service.first_name,
      last: service.last_name,
    },
  },
});

const getDataForService = (services) => {
  if (services.facebook) return parseFacebookData(services.facebook);
  if (services.github) return parseGithubData(services.github);
  if (services.google) return parseGoogleData(services.google);
  return null;
};

export default (user) => {
  if (user) {
    const isOAuth = !user.services ? false : !user.services.password; // If services do not exist, it's the current user.
    const userData = isOAuth ? { _id: user._id, ...getDataForService(user.services) } : { service: 'password', ...user };
    return userData;
  }

  return {};
};
