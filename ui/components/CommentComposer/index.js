import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Validation from '../Validation';
import { document as documentQuery } from '../../queries/Documents.gql';
import addCommentMutation from '../../mutations/Comments.gql';
import StyledCommentComposer from './styles';

const CommentComposer = ({ mutate, documentId }) => (
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
        if (Meteor.userId()) {
          mutate({
            variables: {
              documentId,
              comment: form.comment.value.trim(),
            },
            refetchQueries: [
              { query: documentQuery, variables: { _id: documentId, sortBy: 'newestFirst' } },
            ],
          });

          document.querySelector('[name="comment"]').value = '';
        } else {
          Bert.alert('Sorry, you need to be logged in to comment!', 'danger');
        }
      }}
    >
      <form onSubmit={(event) => event.preventDefault()}>
        <textarea
          className="form-control"
          name="comment"
          placeholder="Have a comment about this?"
        />
        <Button type="submit" bsStyle="success">
          Post Comment
        </Button>
      </form>
    </Validation>
  </StyledCommentComposer>
);

CommentComposer.propTypes = {
  documentId: PropTypes.string.isRequired,
  mutate: PropTypes.func.isRequired,
};

export default graphql(addCommentMutation)(CommentComposer);
