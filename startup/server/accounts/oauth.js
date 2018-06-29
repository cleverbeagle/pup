import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

if (Meteor.settings.private && Meteor.settings.private.OAuth) {
  const OAuthSettings = Meteor.settings.private.OAuth;

  Object.keys(OAuthSettings).forEach((service) => {
    ServiceConfiguration.configurations.upsert(
      { service },
      { $set: OAuthSettings[service] },
    );
  });
} else {
  console.warn('[Pup] Woof! OAuth settings are not configured. OAuth login will not function. See https://cleverbeagle.com/pup/v1/accounts/oauth-setup#setting-oauth-credentials for configuration instructions.');
}
