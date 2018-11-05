import { ServiceConfiguration } from 'meteor/service-configuration';

export default {
  oAuthServices: (parent, args) => {
    const verifiedServices = [];
    args.services.forEach((service) => {
      const serviceConfig = ServiceConfiguration.configurations.findOne({ service });
      if (serviceConfig && serviceConfig.enabled) {
        verifiedServices.push(service);
      }
    });
    return verifiedServices.sort();
  },
};
