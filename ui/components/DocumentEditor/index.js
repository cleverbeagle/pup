/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Bert } from 'meteor/themeteorchef:bert';
import Validation from '../../components/Validation';

class DocumentEditor extends React.Component {
  getDocumentMutation(doc) {
    console.log(doc);
    return doc
      ? gql`
          mutation updateDocument($_id: String!, $title: String, $body: String) {
            updateDocument(_id: $_id, title: $title, body: $body) {
              _id
            }
          }
        `
      : gql`
          mutation addDocument($title: String!, $body: String!) {
            addDocument(title: $title, body: $body) {
              _id
            }
          }
        `;
  }

  render() {
    const { doc, history } = this.props;
    return (
      <Mutation
        ignoreResults
        mutation={this.getDocumentMutation(doc)}
        update={(cache, { data: { addDocument, updateDocument } }) => {
          // TODO: Add a cache update here.
          // See: https://www.apollographql.com/docs/react/essentials/mutations.html#update
        }}
        onCompleted={(data) => {
          const _id = doc ? data.updateDocument._id : data.addDocument._id;
          Bert.alert(doc ? 'Document updated!' : 'Document added!', 'success');
          history.push(`/documents/${_id}`);
        }}
        onError={(error) => {
          console.log(error);
          Bert.alert(error.message, 'danger');
        }}
      >
        {(mutate) => (
          <Validation
            rules={{
              title: {
                required: true,
              },
              body: {
                required: true,
              },
            }}
            messages={{
              title: {
                required: 'Need a title in here, Seuss.',
              },
              body: {
                required: 'This thneeds a body, please.',
              },
            }}
            submitHandler={(form) => {
              const document = {
                variables: {
                  title: form.title.value.trim(),
                  body: form.body.value.trim(),
                },
              };

              if (doc) document.variables._id = doc._id;
              mutate(document);
            }}
          >
            <form ref={(form) => (this.form = form)} onSubmit={(event) => event.preventDefault()}>
              <FormGroup>
                <ControlLabel>Title</ControlLabel>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  defaultValue={doc && doc.title}
                  placeholder="Oh, The Places You'll Go!"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Body</ControlLabel>
                <textarea
                  className="form-control"
                  name="body"
                  defaultValue={doc && doc.body}
                  placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
                />
              </FormGroup>
              <Button type="submit" bsStyle="success">
                {doc && doc._id ? 'Save Changes' : 'Add Document'}
              </Button>
            </form>
          </Validation>
        )}
      </Mutation>
    );
  }
}

DocumentEditor.defaultProps = {
  doc: null,
};

DocumentEditor.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default DocumentEditor;
