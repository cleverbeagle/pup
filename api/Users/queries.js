import { Meteor } from 'meteor/meteor';

export default {
  user: ({ userId }) => {
    const user = Meteor.users.findOne({ _id: userId });
    return {
      _id: user._id,
      name: `${user.profile.name.first} ${user.profile.name.last}`,
      emailAddress: user.emails[0].address,
    };
  },
};
