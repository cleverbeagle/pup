/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ServiceConfiguration } from 'meteor/service-configuration';
import handleMethodException from '../../../modules/handleMethodException';
import rateLimit from '../../../modules/rateLimit';

Meteor.methods({
  'oauth.verifyConfiguration': function oauthVerifyConfiguration(services) {
    check(services, Array);

    try {
      const verifiedServices = [];
      services.forEach((service) => {
        const serviceConfig = ServiceConfiguration.configurations.findOne({ service });
        if (serviceConfig && serviceConfig.enabled) {
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
