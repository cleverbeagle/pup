import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import getPrivateFile from '../../../modules/server/get-private-file';
import templateToHTML from '../../../modules/server/handlebars-email-to-html';
import templateToText from '../../../modules/server/handlebars-email-to-text';

const { emailTemplates } = Accounts;
const { productName } = Meteor.settings.public;

emailTemplates.siteName = productName;
emailTemplates.from = Meteor.settings.private.supportEmail;

emailTemplates.verifyEmail = {
  subject() {
    return `[${productName}] Verify Your Email Address`;
  },
  html(user, url) {
    return templateToHTML(getPrivateFile('email-templates/verify-email.html'), {
      title: 'Let\'s Verify Your Email',
      subtitle: `Verify your email to start using ${productName}.`,
      productName,
      firstName: user.profile.name.first,
      verifyUrl: url.replace('#/', ''),
    });
  },
  text(user, url) {
    const urlWithoutHash = url.replace('#/', '');
    if (Meteor.isDevelopment) console.info(`[Pup] Verify Email Link: ${urlWithoutHash}`); // eslint-disable-line
    return templateToText(getPrivateFile('email-templates/verify-email.txt'), {
      productName,
      firstName: user.profile.name.first,
      verifyUrl: urlWithoutHash,
    });
  },
};

emailTemplates.resetPassword = {
  subject() {
    return `[${productName}] Reset Your Password`;
  },
  html(user, url) {
    return templateToHTML(getPrivateFile('email-templates/reset-password.html'), {
      title: 'Let\'s Reset Your Password',
      subtitle: 'A password reset was requested for this email address.',
      firstName: user.profile.name.first,
      productName,
      emailAddress: user.emails[0].address,
      resetUrl: url.replace('#/', ''),
    });
  },
  text(user, url) {
    const urlWithoutHash = url.replace('#/', '');
    if (Meteor.isDevelopment) console.info(`Reset Password Link: ${urlWithoutHash}`); // eslint-disable-line
    return templateToText(getPrivateFile('email-templates/reset-password.txt'), {
      firstName: user.profile.name.first,
      productName,
      emailAddress: user.emails[0].address,
      resetUrl: urlWithoutHash,
    });
  },
};
