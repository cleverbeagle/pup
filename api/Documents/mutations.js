import sanitizeHtml from 'sanitize-html';
import Documents from './Documents';

export default {
  addDocument(root, args, { user }) {
    if (!user) throw new Error('Sorry, you must be logged in to add a new document.');
    const date = new Date().toISOString();
    const documentId = Documents.insert({
      isPublic: args.isPublic || false,
      title: args.title || `Untitled Document #${Documents.find().count() + 1}`,
      body: sanitizeHtml(args.body) || 'This is my document. There are many like it, but this one is mine.',
      owner: user._id,
      createdAt: date,
      updatedAt: date,
    });
    const doc = Documents.findOne(documentId);
    return doc;
  },
  updateDocument(root, args, { user, pubsub }) {
    if (!user) throw new Error('Sorry, you must be logged in to update a document.');
    Documents.update({ _id: args._id }, { $set: {
      ...args,
      body: sanitizeHtml(args.body),
      updatedAt: new Date().toISOString()
    } });
    const doc = Documents.findOne(args._id);
    pubsub.publish('documentUpdated', doc);
    return doc;
  },
  removeDocument(root, args, { user, pubsub }) {
    if (!user) throw new Error('Sorry, you must be logged in to remove a document.');
    Documents.remove(args, () => {
      pubsub.publish('documentRemoved', args);
    });
    return args;
  },
};
