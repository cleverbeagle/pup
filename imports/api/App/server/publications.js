import { Meteor } from 'meteor/meteor';
import UserSettings from '../../UserSettings/UserSettings';

Meteor.publish('app', function app() {
  return [
    UserSettings.find({ userId: this.userId }),
  ];
});
