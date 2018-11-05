module.exports = {
  users: [
    {
      _id: 'abc123',
      emails: [{ verified: true, address: 'admin@admin.com' }],
      profile: {
        name: {
          first: 'Andy',
          last: 'Warhol',
        },
      },
      roles: ['admin'],
    },
    {
      _id: 'def123',
      emails: [{ verified: true, address: 'user+1@test.com' }],
      profile: {
        name: {
          first: 'Hieronymus',
          last: 'Bosch',
        },
      },
      roles: ['user'],
    },
    {
      _id: 'ghi123',
      emails: [{ verified: true, address: 'user+2@test.com' }],
      profile: {
        name: {
          first: 'Jean-Michel',
          last: 'Basquiat',
        },
      },
      roles: ['user'],
    },
  ],
};
