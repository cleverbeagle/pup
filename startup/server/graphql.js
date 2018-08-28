import pupql from '@cleverbeagle/pupql';
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { getUser } from 'meteor/apollo';
import schema from '../../api/GraphQL/schema';

export default pupql({
  schema,
  databases: {
    mongodb: {
      connectionString: process.env.MONGO_URL,
    },
  },
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization),
  }),
  config: {
    existingWebServer: WebApp.connectHandlers,
    existingWebSocketServer: WebApp.httpServer,
  },
});
