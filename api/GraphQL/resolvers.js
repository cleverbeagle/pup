export default {
  Query: {
    documents: (parent, args, context) => {
      const query = Object.assign({}, args);
      return context.db.mongodb.collection('Documents').find(query).toArray();
    },
  },
};
