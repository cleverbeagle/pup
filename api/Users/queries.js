import { Meteor } from 'meteor/meteor';

export default {
  user: (parent) => {
    console.log(parent);
    const user = Meteor.users.findOne({ _id: parent.userId });
    return {
      _id: user._id,
      name: `${user.profile.name.first} ${user.profile.name.last}`,
      emailAddress: user.emails[0].address,
    };
  },
};
