import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import getPrivateFile from '../../../modules/server/get-private-file';
import templateToHTML from '../../../modules/server/handlebars-email-to-html';
import templateToText from '../../../modules/server/handlebars-email-to-text';

const { emailTemplates } = Accounts;
const { applicationName } = Meteor.settings.public;

emailTemplates.siteName = applicationName;
emailTemplates.from = Meteor.settings.private.supportEmailFrom;

emailTemplates.verifyEmail = {
  subject() {
    return `[${applicationName}] Verify Your Email Address`;
  },
  html(user, url) {
    return templateToHTML(getPrivateFile('email-templates/verify-email.html'), {
      applicationName,
      firstName: user.profile.name.first,
      verifyUrl: url.replace('#/', ''),
    });
  },
  text(user, url) {
    const urlWithoutHash = url.replace('#/', '');
    if (Meteor.isDevelopment) console.info(`Verify Email Link: ${urlWithoutHash}`); // eslint-disable-line
    return templateToText(getPrivateFile('email-templates/verify-email.txt'), {
      applicationName,
      firstName: user.profile.name.first,
      verifyUrl: urlWithoutHash,
    });
  },
};

emailTemplates.resetPassword = {
  subject() {
    return `[${applicationName}] Reset Your Password`;
  },
  html(user, url) {
    return templateToHTML(getPrivateFile('email-templates/reset-password.html'), {
      firstName: user.profile.name.first,
      applicationName,
      emailAddress: user.emails[0].address,
      resetUrl: url.replace('#/', ''),
    });
  },
  text(user, url) {
    const urlWithoutHash = url.replace('#/', '');
    if (Meteor.isDevelopment) console.info(`Reset Password Link: ${urlWithoutHash}`); // eslint-disable-line
    return templateToText(getPrivateFile('email-templates/reset-password.txt'), {
      firstName: user.profile.name.first,
      applicationName,
      emailAddress: user.emails[0].address,
      resetUrl: urlWithoutHash,
    });
  },
};
