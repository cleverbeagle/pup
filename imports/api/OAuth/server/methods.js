import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ServiceConfiguration } from 'meteor/service-configuration';
import handleMethodException from '../../../modules/handle-method-exception';
import rateLimit from '../../../modules/rate-limit';

Meteor.methods({
  'oauth.verifyConfiguration': function oauthVerifyConfiguration(services) {
    check(services, Array);

    try {
      const verifiedServices = [];
      services.forEach((service) => {
        if (ServiceConfiguration.configurations.findOne({ service })) {
          verifiedServices.push(service);
        }
      });
      return verifiedServices.sort();
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: [
    'oauth.verifyConfiguration',
  ],
  limit: 5,
  timeRange: 1000,
});
