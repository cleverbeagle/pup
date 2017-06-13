import { Meteor } from 'meteor/meteor';

if (Meteor.isDevelopment) process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;
