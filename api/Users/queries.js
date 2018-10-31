import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import getUserProfile from '../../modules/getUserProfile';

const fetchUsers = (query, projection) =>
  Meteor.users
    .find(query, projection)
    .fetch()
    .map((user) => {
      const userProfile = getUserProfile(user);
      console.log(user);
      return {
        _id: userProfile._id,
        name: userProfile.profile.name,
        emailAddress: userProfile.emails[0].address,
        oAuthProvider: userProfile.service !== 'password' ? userProfile.service : null,
      };
    });

export default {
  users: (parent, args, { user }) => {
    if (!user || !Roles.userIsInRole(user._id, 'admin')) {
      throw new Error('Sorry, you need to be an administrator to do this.');
    }

    const skip = args.currentPage * args.usersPerPage - args.usersPerPage;
    const searchRegex = args.search ? new RegExp(args.search, 'i') : null;
    const sort = {
      'profile.name.last': 1,
      'services.facebook.first_name': 1,
      'services.google.name': 1,
      'services.github.username': 1,
    };

    return {
      total: Meteor.users.find({ _id: { $ne: user._id } }).count(),
      users: args.search
        ? fetchUsers(
            {
              _id: { $ne: user._id },
              $or: [
                { 'profile.name.first': searchRegex },
                { 'profile.name.last': searchRegex },
                { 'emails.address': searchRegex },
                { 'services.facebook.first_name': searchRegex },
                { 'services.facebook.last_name': searchRegex },
                { 'services.facebook.email': searchRegex },
                { 'services.google.name': searchRegex },
                { 'services.google.email': searchRegex },
                { 'services.github.email': searchRegex },
                { 'services.github.username': searchRegex },
              ],
            },
            { sort },
          )
        : fetchUsers({ _id: { $ne: user._id } }, { limit: args.usersPerPage, skip, sort }),
    };
  },
  user: (parent, { _id }) => {
    const userIdFromParentQuery = parent && parent.userId;
    const user = Meteor.users.findOne({ _id: userIdFromParentQuery || _id });
    const userProfile = getUserProfile(user);

    return {
      _id: userIdFromParentQuery || _id,
      name: userProfile.profile.name,
      emailAddress: userProfile.emails[0].address,
      roles:
        Roles.getAllRoles().map((role) => {
          role.inRole = Roles.userIsInRole(userIdFromParentQuery || _id, role.name); // eslint-disable-line
          return role;
        }) || [],
      oAuthProvider: userProfile.service !== 'password' ? userProfile.service : null,
      settings: user.settings,
    };
  },
};
