/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, Button } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import { Bert } from 'meteor/themeteorchef:bert';
import Validation from '../../components/Validation';
import { documents } from '../../queries/Documents.gql';
import { updateDocument, addDocument } from '../../mutations/Documents.gql';

import {
  StyledDocumentEditor,
  DocumentEditorTitle,
  DocumentEditorBody,
  DocumentEditorFooter,
} from './styles';

class DocumentEditor extends React.Component {
  render() {
    const { doc, history } = this.props;
    return (
      <StyledDocumentEditor>
        <Mutation
          ignoreResults
          mutation={doc ? updateDocument : addDocument}
          update={(cache, { data }) => {
            const query = cache.readQuery({ query: documents });
            cache.writeQuery({
              query: documents,
              data: {
                documents: query.documents.concat([data.addDocument || data.updateDocument]),
              },
            });
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
                <DocumentEditorTitle>
                  <ControlLabel>Title</ControlLabel>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    defaultValue={doc && doc.title}
                    placeholder="Document Title"
                  />
                </DocumentEditorTitle>
                <DocumentEditorBody>
                  <ControlLabel>Body</ControlLabel>
                  <textarea
                    className="form-control"
                    name="body"
                    defaultValue={doc && doc.body}
                    placeholder="This is my document. There are many like it, but this one is mine."
                  />
                </DocumentEditorBody>
                <DocumentEditorFooter>
                  <Button type="submit" bsStyle="success">
                    {doc && doc._id ? 'Save Changes' : 'Add Document'}
                  </Button>
                </DocumentEditorFooter>
              </form>
            </Validation>
          )}
        </Mutation>
      </StyledDocumentEditor>
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
