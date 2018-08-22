import pupql from '@cleverbeagle/pupql';
import schema from '../../api/GraphQL/schema';

pupql({
  schema,
  databases: {
    mongodb: {
      connectionString: process.env.MONGO_URL,
    },
  },
});
