import Comments from './Comments';

export default {
  comments: (parent, args) => {
    console.log(parent, args);
    return Comments.find({ documentId: args.documentId }).fetch();
  },
};
