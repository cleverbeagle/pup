import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const UserSettings = new Mongo.Collection('UserSettings');

UserSettings.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

UserSettings.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

const UserSettingsSchema = new SimpleSchema({
  userId: {
    type: String,
    label: 'The ID of the user these settings belong to.',
  },
  settings: {
    type: Array,
    label: 'The settings for the user.',
    defaultValue: [],
  },
  'settings.$': {
    type: Object,
    label: 'A setting for the user.',
    blackbox: true,
  },
  'settings.$.isGDPR': {
    type: Boolean,
    label: 'Is this a GDPR-specific setting?',
    defaultValue: false,
  },
  'settings.$.key': {
    type: String,
    label: 'What is the key value you\'ll access this setting with?',
  },
  'settings.$.label': {
    type: String,
    label: 'The user-facing label for the setting.',
  },
  'settings.$.value': {
    type: SimpleSchema.oneOf(String, Boolean, Number),
    label: 'The value for the setting',
  },
  'settings.$.lastUpdatedByUser': {
    type: String,
    label: 'The date this setting was last updated by the user.',
    defaultValue: null,
  },
  'settings.$.lastUpdatedByAdmin': {
    type: String,
    label: 'The date this setting was last updated by an admin.',
    defaultValue: null,
  },
});

UserSettings.attachSchema(UserSettingsSchema);

export default UserSettings;
