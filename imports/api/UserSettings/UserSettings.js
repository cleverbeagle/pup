import { Mongo } from 'meteor/mongo';
import { Match } from 'meteor/check';
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
  isGDPR: {
    type: Boolean,
    label: 'Is this a GDPR-specific setting?',
    defaultValue: false,
  },
  key: {
    type: String,
    label: 'What is the key value you\'ll access this setting with?',
  },
  label: {
    type: String,
    label: 'The user-facing label for the setting.',
  },
  type: {
    type: String,
    allowedValues: ['boolean', 'string', 'number'],
    label: 'What is the primitive type for this setting?',
  },
  value: {
    type: SimpleSchema.oneOf(Boolean, Number, String),
    label: 'The value for the setting',
    autoValue() { // eslint-disable-line
      // NOTE: Pass default value as a string to get around this:
      // https://github.com/aldeed/simple-schema-js/issues/169
      if (this.isInsert || this.isUpsert) {
        const type = this.field('type');
        if (type.value) {
          return {
            boolean: this.value == 'true', // eslint-disable-line
            string: this.value,
            number: parseInt(this.value, 10),
          }[type.value];
        }
      }
    },
  },
});

UserSettings.attachSchema(UserSettingsSchema);

export default UserSettings;
