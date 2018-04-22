import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import sendEmail from '../../../modules/server/send-email';
import getOAuthProfile from '../../../modules/get-oauth-profile';

export default (oauthUser) => {
  const user = !oauthUser ? Meteor.user() : check(oauthUser, Object);
  const OAuthProfile = getOAuthProfile(user.profile, user);

  const applicationName = 'Application Name';
  const firstName = OAuthProfile ? OAuthProfile.name.first : user.profile.name.first;
  const emailAddress = OAuthProfile ? OAuthProfile.email : user.emails[0].address;

  return sendEmail({
    to: emailAddress,
    from: `${applicationName} <support@application.com>`,
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
