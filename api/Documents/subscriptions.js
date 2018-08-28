export default {
  documentAdded: {
    subscribe: (root, args, context) => context.pubsub.asyncIterator('documentAdded'),
  },
  documentUpdated: {
    subscribe: (root, args, context) => context.pubsub.asyncIterator('documentUpdated'),
  },
  documentRemoved: {
    subscribe: (root, args, context) => context.pubsub.asyncIterator('documentRemoved'),
  },
};
