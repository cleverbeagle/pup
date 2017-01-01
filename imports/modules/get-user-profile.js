const parseGoogleData = service => ({
  service: 'Google',
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
  service: 'GitHub',
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
  service: 'Facebook',
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
    const userData = isOAuth ? { _id: user._id, ...getDataForService(user.services) } : { service: 'Password', ...user };
    return userData;
  }

  return {};
};
