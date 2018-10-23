import Comments from './Comments';

export default {
  comments: ({ _id }) => Comments.find({ documentId: _id }).fetch(),
};
