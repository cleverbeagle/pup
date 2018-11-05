import Documents from './Documents';

export default {
  documents: (parent, args, context) =>
    context.user && context.user._id ? Documents.find({ owner: context.user._id }).fetch() : [],
  document: (parent, args, context) =>
    Documents.findOne({
      $or: [
        { _id: args._id, owner: context.user && context.user._id ? context.user._id : null },
        { _id: args._id, isPublic: true },
      ],
    }),
};
