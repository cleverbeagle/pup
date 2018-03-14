import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

if (Meteor.settings.private && Meteor.settings.private.OAuth) {
  const OAuthSettings = Meteor.settings.private.OAuth;

  if (OAuthSettings) {
    Object.keys(OAuthSettings).forEach((service) => {
      ServiceConfiguration.configurations.upsert(
        { service },
        { $set: OAuthSettings[service] },
      );
    });
  }
} else {
  console.warn('Warning! Oauth settings are not configured. OAuth logins will not function.');
}
