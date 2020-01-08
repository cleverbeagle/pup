/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormLabel, DropdownButton, Dropdown } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import autoBind from 'react-autobind';
import { Bert } from 'meteor/themeteorchef:bert';
import Icon from '../Icon';
import { editDocument as editDocumentQuery, documents } from '../../queries/Documents.gql';
import { updateDocument, removeDocument } from '../../mutations/Documents.gql';
import delay from '../../../modules/delay';
import { timeago } from '../../../modules/dates';

import {
  StyledDocumentEditor,
  DocumentEditorHeader,
  DocumentEditorTitle,
  DocumentEditorBody,
} from './styles';

class DocumentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { saving: false, mutation: 'updateDocument' };
    autoBind(this);
  }

  handleUpdateDocument(mutate) {
    const { doc } = this.props;
    this.setState({ mutation: 'updateDocument', saving: true }, () => {
      delay(() => {
        mutate({
          variables: {
            _id: doc._id,
            title: this.form.title.value.trim(),
            body: this.form.body.value.trim(),
          },
          refetchQueries: [{ query: editDocumentQuery }],
        });
      }, 300);
    });
  }

  handleSetVisibility(mutate, isPublic) {
    const { doc } = this.props;
    this.setState({ mutation: 'updateDocument', saving: true }, () => {
      mutate({
        variables: {
          _id: doc._id,
          isPublic: isPublic === 'public',
        },
      });
    });
  }

  handleRemoveDocument(mutate) {
    const { doc } = this.props;
    if (confirm('Are you sure? This is permanent!')) {
      this.setState({ mutation: 'removeDocument' }, () => {
        mutate({
          variables: {
            _id: doc._id,
          },
        });
      });
    }
  }

  render() {
    const { doc, history } = this.props;
    const { mutation, saving } = this.state;

    const settingsIcon = (
      <span>
        <Icon iconStyle="solid" icon="gear" />
      </span>
    );

    return (
      <Mutation
        ignoreResults
        mutation={{ updateDocument, removeDocument }[mutation]}
        refetchQueries={mutation === 'removeDocument' ? [{ query: documents }] : []}
        awaitRefetchQueries
        onCompleted={() => {
          if (mutation === 'updateDocument') {
            // NOTE: Delay set of saving to false so UI changes aren't jarring.
            setTimeout(() => this.setState({ saving: false }), 1000);
          }

          if (mutation === 'removeDocument') {
            history.push('/documents');
            Bert.alert('Document removed!', 'success');
          }
        }}
        onError={(error) => {
          Bert.alert(error.message, 'danger');
        }}
      >
        {(mutate) => (
          <div>
            <DocumentEditorHeader className="clearfix">
              <p>
                {saving ? <em>Saving...</em> : <span>Last edit was{timeago(doc.updatedAt)}</span>}
              </p>
              <DropdownButton variant="default" title={<settingsIcon />} id="set-document-public">
                <Dropdown.Item onClick={() => history.push(`/documents/${doc._id}`)}>
                  <Icon iconStyle="solid" icon="external-link-alt" />
                  View Document
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Visibility</Dropdown.Header>
                <Dropdown.Item
                  className={doc.isPublic && 'active'}
                  eventkey="1"
                  onClick={() => this.handleSetVisibility(mutate, 'public')}
                >
                  <Icon iconStyle="solid" icon="unlock" />
                  Public
                </Dropdown.Item>
                <Dropdown.Item
                  className={!doc.isPublic && 'active'}
                  eventkey="2"
                  onClick={() => this.handleSetVisibility(mutate, 'private')}
                >
                  <Icon iconStyle="solid" icon="lock" />
                  Private
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => this.handleRemoveDocument(mutate)}>
                  <span className="text-danger">Delete Document</span>
                </Dropdown.Item>
              </DropdownButton>
            </DocumentEditorHeader>

            <StyledDocumentEditor>
              <Form ref={(form) => (this.form = form)} onSubmit={(event) => event.preventDefault()}>
                <DocumentEditorTitle>
                  <FormLabel>Title</FormLabel>
                  <Form.Control
                    type="text"
                    name="title"
                    defaultValue={doc && doc.title}
                    placeholder="Document Title"
                    onChange={() => this.handleUpdateDocument(mutate)}
                  />
                </DocumentEditorTitle>

                <DocumentEditorBody>
                  <FormLabel>Body</FormLabel>
                  <Form.Control
                    as="textarea"
                    name="body"
                    defaultValue={doc && doc.body}
                    placeholder="This is my document. There are many like it, but this one is mine."
                    onChange={() => this.handleUpdateDocument(mutate)}
                  />
                </DocumentEditorBody>
              </Form>
            </StyledDocumentEditor>
          </div>
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
