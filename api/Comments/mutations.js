import { Roles } from 'meteor/alanning:roles';
import Comments from './Comments';

export default {
  addComment(root, args, { user, pubsub }) {
    if (!user) throw new Error('Sorry, you must be logged in to add a new comment.');

    const date = new Date().toISOString();
    const commentToInsert = {
      documentId: args.documentId,
      comment: args.comment,
      userId: user._id,
      createdAt: date,
    };

    const commentId = Comments.insert(commentToInsert);
    pubsub.publish('commentAdded', {
      commentAdded: { _id: commentId, ...commentToInsert },
    });

    return { _id: commentId, ...commentToInsert };
  },
  removeComment(root, args, { user }) {
    if (!user) throw new Error('Sorry, you must be logged in to remove a comment.');

    const comment = Comments.findOne({ _id: args._id }, { fields: { userId: 1 } });

    if (!Roles.userIsRole(user._id, 'admin') || comment.userId !== user._id) {
      throw new Error('Sorry, you must be logged in to remove a comment.');
    }

    Comments.remove(args._id);

    return { _id: args._id };
  },
};
