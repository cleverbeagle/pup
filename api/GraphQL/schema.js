import typeDefs from './types';
import queries from './queries';
// import mutations from './mutations';
// import subscriptions from './subscriptions';

export default {
  typeDefs,
  resolvers: {
    ...queries,
    // ...mutations,
    // ...subscriptions,
  },
};
