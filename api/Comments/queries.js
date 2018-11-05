import Comments from './Comments';

export default {
  comments: ({ _id }) => Comments.find({ documentId: _id }, { sort: { createdAt: 1 } }).fetch(),
};
