import { ApolloServer } from 'apollo-server-express';
import { WebApp } from 'meteor/webapp';
import { getUser } from 'meteor/apollo';
import schema from './api';

const server = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization),
  }),
  uploads: false,
});

server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql',
});
