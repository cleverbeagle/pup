import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import getUserProfile from '../../modules/getUserProfile';

const mapUserToSchema = (user) => {
  const userProfile = getUserProfile(user);
  return {
    _id: userProfile._id,
    name: userProfile.profile.name,
    emailAddress: userProfile.emails[0].address,
    roles:
      Roles.getAllRoles().map((role) => {
        role.inRole = Roles.userIsInRole(user._id, role.name); // eslint-disable-line
        return role;
      }) || [],
    oAuthProvider: userProfile.service !== 'password' ? userProfile.service : null,
  };
};

export default ({ operation, query, projection }) => {
  const userOrUsers = Meteor.users[operation](query, projection);
  return operation === 'findOne'
    ? mapUserToSchema(userOrUsers)
    : userOrUsers.fetch().map(mapUserToSchema);
};
