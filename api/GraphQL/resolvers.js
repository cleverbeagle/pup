export default {
  Query: {
    documents: (parent, args, { user, db }) =>
      db.mongodb
        .collection('Documents')
        .find({ owner: user._id })
        .toArray(),
    document: (parent, args, { db }) =>
      db.mongodb.collection('Documents').findOne({ _id: args._id }),
  },
};
