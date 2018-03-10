import { Meteor } from 'meteor/meteor';
import sendEmail from '../../../modules/server/send-email';
import getOAuthProfile from '../../../modules/get-oauth-profile';

export default (user) => {
  const tmpUser = !user ? Meteor.user() : user;
  const OAuthProfile = getOAuthProfile(tmpUser.profile, tmpUser);

  const applicationName = 'Application Name';
  const firstName = OAuthProfile ? OAuthProfile.name.first : tmpUser.profile.name.first;
  const emailAddress = OAuthProfile ? OAuthProfile.email : tmpUser.emails[0].address;

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
