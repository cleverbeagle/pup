import { pubsub } from '../../startup/server/graphql';

export default {
  Mutation: {
    addPost(root, args) {
      pubsub.publish('DOCUMENT_ADDED', { postAdded: args });
      return { lookingGood: true };
    },
  },
};
