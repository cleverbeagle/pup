module.exports = {
  Meteor: {
    absoluteUrl: jest.fn(() => 'http://localhost:3000/'),
    Error: jest.fn(),
    isServer: true,
    loginWithPassword: jest.fn(),
    loginWithFacebook: jest.fn(),
    methods: jest.fn(),
    call: jest.fn(),
    publish: jest.fn(),
    subscribe: jest.fn(),
    user: jest.fn(),
    users: {
      findOne: jest.fn(),
      find: jest.fn(),
    },
    userId: jest.fn().mockReturnValue('abc123'),
    startup: jest.fn(),
    bindEnvironment: jest.fn(),
    wrapAsync: jest.fn(),
    settings: {
      private: {
        mailChimp: {
          apiKey: '123456',
          lists: {
            Pupgrades: '123abc',
            Waitlist: '123abc',
            'Mentorship Subscribers': '123abc',
          },
        },
        postmark: {
          apiKey: '123456',
        },
        slack: {
          hooks: {
            'cb-app-log': 'https://webhook.site/267b1e98-8c7d-4955-a6e8-e76f99b3848b',
          },
        },
      },
    },
  },
};
