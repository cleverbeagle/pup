export default {
  Query: {
    documents: (parent, args, { user, db }) => {
      const query = Object.assign({}, args, user && user._id ? { owner: user._id } : {});
      return db.mongodb
        .collection('Documents')
        .find(query)
        .toArray();
    },
    document: (parent, args, { db }) =>
      db.mongodb.collection('Documents').findOne({ _id: args._id }),
  },
};
