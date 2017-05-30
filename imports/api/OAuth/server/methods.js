import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ServiceConfiguration } from 'meteor/service-configuration';

Meteor.methods({
  'oauth.verifyConfiguration': function oauthVerifyConfiguration(services) {
    check(services, Array);
    const verifiedServices = [];
    services.forEach((service) => {
      if (ServiceConfiguration.configurations.findOne({ service })) verifiedServices.push(service);
    });
    return verifiedServices.sort();
  },
});
