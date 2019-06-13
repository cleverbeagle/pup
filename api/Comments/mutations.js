import sanitizeHtml from 'sanitize-html';
import Comments from './Comments';
import { isAdmin } from '../Users/actions/checkIfAuthorized';

export default {
  addComment(root, args, context) {
    if (!context.user) throw new Error('Sorry, you must be logged in to add a new comment.');

    const date = new Date().toISOString();
    const commentToInsert = {
      documentId: args.documentId,
      comment: sanitizeHtml(args.comment),
      userId: context.user._id,
      createdAt: date,
    };

    const commentId = Comments.insert(commentToInsert);
    return { _id: commentId, ...commentToInsert };
  },
  removeComment(root, args, context) {
    if (!context.user) throw new Error('Sorry, you must be logged in to remove a comment.');

    const comment = Comments.findOne({ _id: args._id }, { fields: { userId: 1 } });

    if (!isAdmin(context.user._id) || comment.userId !== context.user._id) {
      throw new Error('Sorry, you must be logged in to remove a comment.');
    }

    Comments.remove(args._id);

    return { _id: args._id };
  },
};
