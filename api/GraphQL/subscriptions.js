import server from '../../startup/server/graphql';

export default {
  Subscription: {
    documentAdded: {
      subscribe: () => server.pubsub.asyncIterator('documentAdded'),
    },
    documentUpdated: {
      subscribe: () => server.pubsub.asyncIterator('documentUpdated'),
    },
    documentRemoved: {
      subscribe: () => server.pubsub.asyncIterator('documentRemoved'),
    },
  },
};
