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
});

UserSettings.attachSchema(UserSettingsSchema);

export default UserSettings;
