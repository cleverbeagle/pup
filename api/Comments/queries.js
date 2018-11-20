import Comments from './Comments';

export default {
  comments: ({ _id }) => Comments.find({ documentId: _id }, { sort: { createdAt: 1 } }).fetch(),
  commentsCount: ({ _id }) => Comments.find({ documentId: _id }, { fields: { _id: 1 } }).fetch().length,
};
