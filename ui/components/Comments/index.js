import React from 'react';
import PropTypes from 'prop-types';
import CommentComposer from '../CommentComposer';

import { StyledComments } from './styles';

const Comments = ({ documentId, comments }) => (
  <StyledComments>
    <CommentComposer documentId={documentId} />
    {JSON.stringify(comments)}
  </StyledComments>
);

Comments.propTypes = {
  documentId: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
};

export default Comments;
