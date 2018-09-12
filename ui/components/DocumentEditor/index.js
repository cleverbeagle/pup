/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import autoBind from 'react-autobind';
import { Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import Icon from '../../components/Icon';
import { documents } from '../../queries/Documents.gql';
import { updateDocument } from '../../mutations/Documents.gql';
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
    this.state = { saving: false };
    autoBind(this);
  }

  handleUpdateDocument(mutate) {
    this.setState({ saving: true }, () => {
      delay(() => {
        mutate({
          variables: {
            _id: this.props.doc._id,
            title: this.form.title.value.trim(),
            body: this.form.body.value.trim(),
          },
        });
      }, 500);
    });
  }

  render() {
    const { doc, match } = this.props;
    return (
      <Mutation
        ignoreResults
        mutation={updateDocument}
        update={(cache, { data }) => {
          const query = cache.readQuery({ query: documents });
          cache.writeQuery({
            query: documents,
            data: {
              documents: query.documents.concat([data.updateDocument]),
            },
          });
        }}
        onCompleted={() => {
          // NOTE: Delay set of this.state.saving to false so UI changes aren't jarring.
          setTimeout(() => this.setState({ saving: false }), 1000);
        }}
        onError={(error) => {
          Bert.alert(error.message, 'danger');
        }}
      >
        {(mutate) => (
          <React.Fragment>
            <DocumentEditorHeader className="clearfix">
              <p>
                {this.state.saving ? (
                  <em>Saving...</em>
                ) : (
                  <span>Last edit was {timeago(doc.updatedAt)}</span>
                )}
              </p>
              <DropdownButton
                bsStyle="default"
                title={
                  <span>
                    <Icon iconStyle="solid" icon="gear" />
                  </span>
                }
                id="set-document-public"
              >
                <MenuItem>
                  <Link to={`/documents/${doc._id}`}>
                    <Icon iconStyle="solid" icon="external-link-alt" /> View Document
                  </Link>
                </MenuItem>
                <MenuItem divider />
                <MenuItem header>Visibility</MenuItem>
                <MenuItem
                  className={doc.public && 'active'}
                  eventKey="1"
                  onClick={() => {
                    this.setState({ saving: true }, () => {
                      mutate({
                        variables: {
                          _id: doc._id,
                          public: true,
                        },
                      });
                    });
                  }}
                >
                  <Icon iconStyle="solid" icon="globe" /> Public
                </MenuItem>
                <MenuItem
                  className={!doc.public && 'active'}
                  eventKey="2"
                  onClick={() => {
                    this.setState({ saving: true }, () => {
                      mutate({
                        variables: {
                          _id: doc._id,
                          public: false,
                        },
                      });
                    });
                  }}
                >
                  <Icon iconStyle="solid" icon="lock" /> Private
                </MenuItem>
              </DropdownButton>
            </DocumentEditorHeader>
            <StyledDocumentEditor>
              <form ref={(form) => (this.form = form)} onSubmit={(event) => event.preventDefault()}>
                <DocumentEditorTitle>
                  <ControlLabel>Title</ControlLabel>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    defaultValue={doc && doc.title}
                    placeholder="Document Title"
                    onChange={() => this.handleUpdateDocument(mutate)}
                  />
                </DocumentEditorTitle>
                <DocumentEditorBody>
                  <ControlLabel>Body</ControlLabel>
                  <textarea
                    className="form-control"
                    name="body"
                    defaultValue={doc && doc.body}
                    placeholder="This is my document. There are many like it, but this one is mine."
                    onChange={() => this.handleUpdateDocument(mutate)}
                  />
                </DocumentEditorBody>
              </form>
            </StyledDocumentEditor>
          </React.Fragment>
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
};

export default DocumentEditor;
