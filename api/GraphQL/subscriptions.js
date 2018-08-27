import { pubsub } from '../../startup/server/graphql';

export default {
  Subscription: {
    documentAdded: {
      subscribe: () => pubsub.asyncIterator(['DOCUMENT_ADDED']),
    },
  },
};
