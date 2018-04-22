import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import sendEmail from '../../../modules/server/send-email';
import getOAuthProfile from '../../../modules/get-oauth-profile';

export default (oauthUser) => {
  const user = oauthUser || Meteor.user();
  const OAuthProfile = getOAuthProfile(user.profile, user);

  const { applicationName } = Meteor.settings.public;
  const { supportEmailFrom } = Meteor.settings.private;
  const firstName = OAuthProfile ? OAuthProfile.name.first : options.profile.name.first;
  const emailAddress = OAuthProfile ? OAuthProfile.email : options.email;

  return sendEmail({
    to: emailAddress,
    from: supportEmailFrom,
    subject: `[${applicationName}] Welcome, ${firstName}!`,
    template: 'welcome',
    templateVars: {
      applicationName,
      firstName,
      welcomeUrl: Meteor.absoluteUrl('documents'), // e.g., returns http://localhost:3000/documents
    },
  })
    .catch((error) => {
      throw new Meteor.Error('500', `${error}`);
    });
};
