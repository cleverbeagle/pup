import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Button } from 'react-bootstrap';
import Validation from '../Validation';
import addComment from '../../mutations/Comments.gql';
// import { documents } from '../../queries/Documents.gql';
// import handleUpdateApolloCache from '../../../modules/handleUpdateApolloCache';

import StyledCommentComposer from './styles';

const CommentComposer = ({ documentId }) => (
  <Mutation
    mutation={addComment}
    update={
      (/* cache, { data } */) => {
        // handleUpdateApolloCache(cache, {
        //   query: documents,
        //   field: 'documents',
        //   update: data.addComment,
        // });
      }
    }
    onCompleted={() => {
      document.querySelector('[name="comment"]').value = '';
    }}
  >
    {(mutate) => (
      <StyledCommentComposer>
        <header>Add a Comment</header>
        <Validation
          rules={{
            comment: {
              required: true,
            },
          }}
          messages={{
            comment: {
              required: "What's your comment?",
            },
          }}
          submitHandler={(form) => {
            mutate({
              variables: {
                documentId,
                comment: form.comment.value.trim(),
              },
            });
          }}
        >
          <form ref={(form) => (this.form = form)} onSubmit={(event) => event.preventDefault()}>
            <textarea
              className="form-control"
              name="comment"
              placeholder="Have a comment about this?"
            />
            <Button type="submit" bsStyle="success">
              Share
            </Button>
          </form>
        </Validation>
      </StyledCommentComposer>
    )}
  </Mutation>
);

CommentComposer.propTypes = {
  documentId: PropTypes.string.isRequired,
};

export default CommentComposer;
