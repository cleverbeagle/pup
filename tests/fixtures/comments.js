module.exports = {
  comments: [
    {
      _id: 'comment123',
      userId: 'abc123', // NOTE: Matches userId of admin@admin.com user in /tests/fixtures/users.js fixture.
      documentId: 'document123', // NOTE: Matches _id of first document in /tests/fixtures/documents.js fixture.
      comment: 'This is a comment on a document. Hello!',
      createdAt: '2018-11-05T20:34:54.225Z',
    },
    {
      _id: 'comment456',
      userId: 'def123', // NOTE: Matches userId of user+1@test.com user in /tests/fixtures/users.js fixture.
      documentId: 'document456', // NOTE: Matches _id of second document in /tests/fixtures/documents.js fixture.
      comment: 'This is another comment on a document. Howdy!',
      createdAt: '2018-11-05T20:34:54.225Z',
    },
  ],
};
