import React from 'react';
import PropTypes from 'prop-types';
import CommentComposer from '../CommentComposer';
import { timeago } from '../../../modules/dates';

import { StyledComments, CommentsList, Comment } from './styles';

const Comments = ({ documentId, comments }) => (
  <StyledComments>
    <CommentComposer documentId={documentId} />
    {comments.length > 0 && (
      <CommentsList>
        {comments.map(({ _id, user, createdAt, comment }) => (
          <Comment key={_id}>
            <header>
              <p>
                <strong>{user.name}</strong> <span>{timeago(createdAt)}</span>
              </p>
            </header>
            <div>
              {comment.split('\n').map((item, key) => (
                <p key={`${_id}_${key}` /* eslint-disable-line */}>
                  {item}
                </p>
              ))}
            </div>
          </Comment>
        ))}
      </CommentsList>
    )}
  </StyledComments>
);

Comments.propTypes = {
  documentId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

export default Comments;
