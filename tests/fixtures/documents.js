module.exports = {
  documents: [
    {
      _id: 'document123',
      isPublic: true,
      userId: 'abc123', // NOTE: Matches userId of admin@admin.com user in /tests/fixtures/users.js fixture.
      title: 'Document Title #1',
      body: 'This is my document. There are many like it, but this one is mine.',
      createdAt: '2018-11-05T20:34:54.225Z',
      updatedAt: '2018-11-05T20:34:54.225Z',
    },
    {
      _id: 'document456',
      isPublic: false,
      userId: 'def123', // NOTE: Matches userId of user+1@test.com user in /tests/fixtures/users.js fixture.
      title: 'Document Title #2',
      body: 'This is my document. There are many like it, but this one is mine.',
      createdAt: '2018-11-05T20:34:54.225Z',
      updatedAt: '2018-11-05T20:34:54.225Z',
    },
  ],
};
