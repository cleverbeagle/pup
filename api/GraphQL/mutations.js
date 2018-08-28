import server from '../../startup/server/graphql';

export default {
  Mutation: {
    addDocument: async (root, args, { user, db }) => {
      console.log(user);
      return db.mongodb
        .collection('Documents')
        .insertOne({ ...args })
        .then(({ insertedId }) => {
          server.pubsub.publish('documentAdded', {
            documentAdded: {
              _id: insertedId,
              ...args,
            },
          });
          return insertedId;
        });
    },
    updateDocument(root, args, { user, db }) {
      // TODO: Make sure this is secure.
      server.pubsub.publish('documentUpdated', { documentUpdated: args });
      return db.mongodb.update({ _id: args._id }, { $set: args });
    },
    removeDocument(root, args, { user, db }) {
      // TODO: Make sure this is secure.
      server.pubsub.publish('documentRemoved', { documentRemoved: args });
      return db.mongodb.remove({ _id: args._id });
    },
  },
};
