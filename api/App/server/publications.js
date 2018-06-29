import { Meteor } from 'meteor/meteor';

Meteor.publish('app', function app() {
  return [
    Meteor.users.find({ _id: this.userId }),
  ];
});
