import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

Meteor.publish('admin.user', function adminUser(userId) {
  check(userId, Match.Maybe(String));

  if (Roles.userIsInRole(this.userId, 'admin')) {
    const cursors = [Roles.getAllRoles()];
    if (userId) cursors.push(Meteor.users.find({ _id: userId }));
    return cursors;
  }

  return this.ready();
});
