import seeder from '@cleverbeagle/seeder';
import { Meteor } from 'meteor/meteor';
import Documents from '../../api/Documents/Documents';

seeder(Meteor.users, {
  environments: ['development', 'staging'],
  data: [{
    email: 'admin@admin.com',
    password: 'password',
    profile: {
      name: {
        first: 'George',
        last: 'Clooney',
      },
    },
    roles: ['admin'],
  }],
});

seeder(Documents, {
  environments: ['development', 'staging'],
  wipe: true,
  min: 10,
  model(index, faker) {
    const owner = Meteor.users.findOne({ 'emails.address': 'admin@admin.com' })._id;
    const documentNumber = index + 1;
    return {
      owner,
      title: `${faker.lorem.words(5)} #${documentNumber}`,
      body: `This is the body of example document #${documentNumber}.`,
    };
  },
});
