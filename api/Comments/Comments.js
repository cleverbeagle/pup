/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Comments = new Mongo.Collection('Comments');

Comments.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Comments.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Comments.schema = new SimpleSchema({
  userId: {
    type: SimpleSchema.RegEx.Id,
    label: 'The ID of the user who made this comment',
  },
  documentId: {
    type: SimpleSchema.RegEx.Id,
    label: 'The ID of the document this comment belongs to',
  },
  createdAt: {
    type: String,
    label: 'The date this comment was created.',
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    },
  },
  text: {
    type: String,
    label: 'The text of the comment.',
  },
});

Comments.attachSchema(Comments.schema);

export default Comments;
