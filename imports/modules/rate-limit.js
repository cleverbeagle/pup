import { Meteor } from 'meteor/meteor';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

export default ({ methods, limit, timeRange }) => {
  if (Meteor.isServer) {
    DDPRateLimiter.addRule({
      name(name) { return methods.indexOf(name) > -1; },
      connectionId() { return true; },
    }, limit, timeRange);
  }
};
