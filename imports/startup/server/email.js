import { Meteor } from 'meteor/meteor';

if (Meteor.settings.private && Meteor.settings.private.MAIL_URL) {
  if (Meteor.isDevelopment) process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;
} else {
  console.warn('Warning! You have not configured e-mail settings. E-mails will not be sent.');
}
