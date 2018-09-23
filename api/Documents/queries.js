import Documents from './Documents';

export default {
  documents: (parent, args, { user }) => Documents.find({ owner: user._id }).fetch(),
  document: (parent, args, { user }) =>
    Documents.findOne({
      $or: [{ _id: args._id, owner: user && user._id }, { _id: args._id, isPublic: true }],
    }),
};
