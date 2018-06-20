import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import editProfile from './edit-profile';
import exportData from './export-data';
import deleteAccount from './delete-account';
import sendWelcomeEmail from './send-welcome-email';
import handleMethodException from '../../../modules/handle-method-exception';
import rateLimit from '../../../modules/rate-limit';
import UserSettings from '../../UserSettings/UserSettings';

Meteor.methods({
  'users.sendVerificationEmail': function usersSendVerificationEmail() {
    return Accounts.sendVerificationEmail(this.userId);
  },
  'users.sendWelcomeEmail': function userSendWelcomeEmail() {
    return sendWelcomeEmail()
      .then(response => response)
      .catch((exception) => {
        handleMethodException(exception);
      });
  },
  'users.fetchSettings': function usersFetchSettings(options) { // eslint-disable-line
    check(options, Match.Maybe(Object));

    try {
      const settings = UserSettings.findOne({ userId: options.userId || this.userId });
      if (!options.gdpr && !options.isAdmin) return settings.settings;
      if (options.gdpr && !options.isAdmin) return settings.settings.filter(setting => setting.isGDPR === true);
      if (options.isAdmin) return settings.settings.filter(setting => (setting.isGDPR === false || (typeof setting.isGDPR === 'undefined')));
      return [];
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'users.checkIfGDPRComplete': function usersCheckIfGDPRComplete() { // eslint-disable-line
    try {
      let gdprComplete = true;
      const settings = UserSettings.findOne({ userId: this.userId });
      const gdprSettings = settings.settings.filter(setting => setting.isGDPR === true);
      gdprSettings.forEach(({ lastUpdatedByUser }) => {
        if (!lastUpdatedByUser) gdprComplete = false;
      });
      return gdprComplete;
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'users.saveGDPRSettings': function usersSaveGDPRSettings() { // eslint-disable-line
    try {
      const settings = UserSettings.findOne({ userId: this.userId });
      settings.settings = settings.settings
        .filter(setting => setting.isGDPR === true)
        .map(gdprSetting => ({
          ...gdprSetting,
          lastUpdatedByUser: (new Date()).toISOString(),
        }));
      return UserSettings.update({ _id: settings._id }, { $set: { settings: settings.settings } });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'users.updateSetting': function usersUpdateSetting(setting) { // eslint-disable-line
    check(setting, Object);

    try {
      const settings = UserSettings.findOne({ userId: setting.userId || this.userId });
      const settingToUpdate = settings.settings.find(({ key }) => key === setting.key);

      if (setting.userId && Roles.userIsInRole(this.userId, 'admin')) {
        settingToUpdate.value = setting.value;
        settingToUpdate.lastUpdatedByAdmin = (new Date()).toISOString();
      }

      if (settings.userId === this.userId) {
        settingToUpdate.value = setting.value;
        settingToUpdate.lastUpdatedByUser = (new Date()).toISOString();
      }

      return UserSettings.update(
        { userId: setting.userId || this.userId },
        { $set: { settings: settings.settings } },
      );
    } catch (exception) {
      handleMethodException(exception);
    }
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
  'users.deleteAccount': function usersDeleteAccount(userId) {
    check(userId, Match.Maybe(String));
    if (userId && !Roles.userIsInRole(this.userId, 'admin')) throw new Meteor.Error('403', 'Sorry, you need to be an administrator to do this.');
    return deleteAccount({ userId: userId || this.userId })
      .then(response => response)
      .catch((exception) => {
        handleMethodException(exception);
      });
  },
});

rateLimit({
  methods: [
    'users.sendVerificationEmail',
    'users.sendWelcomeEmail',
    'users.editProfile',
    'users.exportData',
    'users.deleteAccount',
  ],
  limit: 5,
  timeRange: 1000,
});
