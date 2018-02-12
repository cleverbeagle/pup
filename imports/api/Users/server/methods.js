import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import editProfile from './edit-profile';
import exportData from './export-data';
import deleteAccount from './delete-account';
import handleMethodException from '../../../modules/handle-method-exception';
import rateLimit from '../../../modules/rate-limit';

Meteor.methods({
  'users.sendVerificationEmail': function usersSendVerificationEmail() {
    return Accounts.sendVerificationEmail(this.userId);
  },
  'users.editProfile': function usersEditProfile(profile) {
    check(profile, {
      emailAddress: String,
      profile: {
        name: {
          first: String,
          last: String,
        },
      },
    });

    return editProfile({ userId: this.userId, profile })
      .then(response => response)
      .catch((exception) => {
        handleMethodException(exception);
      });
  },
  'users.exportData': function usersExportData() {
    return exportData({ userId: this.userId })
      .then(response => response)
      .catch((exception) => {
        handleMethodException(exception);
      });
  },
  'users.deleteAccount': function usersDeleteAccount() {
    return deleteAccount({ userId: this.userId })
      .then(response => response)
      .catch((exception) => {
        handleMethodException(exception);
      });
  },
});

rateLimit({
  methods: [
    'users.sendVerificationEmail',
    'users.editProfile',
    'users.exportData',
    'users.deleteAccount',
  ],
  limit: 5,
  timeRange: 1000,
});
