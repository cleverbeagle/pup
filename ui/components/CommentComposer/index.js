import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Form, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Validation from '../Validation';
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
          });

          document.querySelector('[name="comment"]').value = '';
        } else {
          Bert.alert('Sorry, you need to be logged in to comment!', 'danger');
        }
      }}
    >
      <form ref={(form) => (this.form = form)} onSubmit={(event) => event.preventDefault()}>
        <Form.Control as="textarea" name="comment" placeholder="Have a comment about this?" />
        <Button type="submit" variant="success">
          Share
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
