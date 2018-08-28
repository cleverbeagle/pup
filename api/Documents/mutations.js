import Documents from './Documents';

export default {
  addDocument(root, args, { user, pubsub }) {
    // if (!user) throw new Error('Sorry, you must be logged in to add a new document.');
    const documentId = Documents.insert({ ...args, owner: 'abc' || user._id });
    const doc = { _id: documentId, ...args };
    pubsub.publish('documentAdded', { documentAdded: doc });
    return doc;
  },
  updateDocument(root, args, { user, pubsub }) {
    // if (!user) throw new Error('Sorry, you must be logged in to updated a document.');
    Documents.update({ _id: args._id }, { $set: args }, () => {
      pubsub.publish('documentUpdated', args);
    });
    return args;
  },
  removeDocument(root, args, { user, pubsub }) {
    // if (!user) throw new Error('Sorry, you must be logged in to remove a document.');
    Documents.remove(args, () => {
      pubsub.publish('documentRemoved', args);
    });
    return args;
  },
};
