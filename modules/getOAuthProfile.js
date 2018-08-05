const parseGoogleData = (service) => ({
  service: 'Google',
  email: service.email,
  name: {
    first: service.given_name,
    last: service.family_name,
  },
});

const parseGithubData = (profile, service) => {
  const name = profile.name ? profile.name.split(' ') : ['', ''];
  return {
    service: 'GitHub',
    email: service.email,
    name: {
      first: name[0],
      last: name[1],
    },
  };
};

const parseFacebookData = (service) => ({
  service: 'Facebook',
  email: service.email,
  name: {
    first: service.first_name,
    last: service.last_name,
  },
});

const getDataForService = (options, services) => {
  if (services.facebook) return parseFacebookData(services.facebook);
  if (services.github) return parseGithubData(options, services.github);
  if (services.google) return parseGoogleData(services.google);
  return null;
};

export default (options = { password: false }, user) => {
  const isOAuth = !options.password;
  const serviceData = isOAuth ? getDataForService(options, user.services) : null;
  return isOAuth ? serviceData : null;
};
